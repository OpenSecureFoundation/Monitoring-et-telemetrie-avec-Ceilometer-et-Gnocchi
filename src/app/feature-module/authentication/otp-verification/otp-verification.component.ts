import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  routes,
  SpinnerService
} from 'src/app/core/core.index';
import { UserService } from '../users-services/users.service';
import { RequestBody } from '../models/resquest.body';
import { Store } from '@ngxs/store';
import { ConfirmOtp,
  ResendOtp
} from '../store/actions.users';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BackgroundService } from '../users-services/bg.service';
import { Icon } from '../models/icon';
import { Time } from '../models/time';
import { Observable, of, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  // selector: 'app-sass-login',
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss',
  standalone: false,
  animations: [
    trigger('fade', [ // Un seul trigger pour le fading et la hauteur
      transition(':enter', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }), // Démarre caché et sans hauteur
        animate('500ms ease-out', style({ opacity: 1, height: '*' })) // Anime opacité et hauteur
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }), // Cache le débordement pendant la disparition
        animate('500ms ease-in', style({ opacity: 0, height: 0 })) // Anime opacité et hauteur à zéro
      ])
    ]),
     trigger('heightGrowShrink', [
      transition(':enter', [ // Quand le conteneur apparaît (si *ngIf était sur le parent)
        style({ height: 0, overflow: 'hidden' }),
        animate('1000ms ease-out', style({ height: '*' })) // Animer vers la hauteur naturelle
      ]),
      transition(':leave', [ // Quand le conteneur disparaît
        style({ overflow: 'hidden' }),
        animate('300ms ease-in', style({ height: 0 })) // Animer vers une hauteur de 0
      ]),
    ])
  ],
})

export class OtpVerificationComponent implements AfterViewInit, OnInit {

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  public routes = routes;
  public show_password = true;
  backgroundIcons: Icon[] = [];
  requestBody: RequestBody = {
    purpose: '',
    otp: '',
    email: '',
  };
  sendOtp: boolean = true;
  time$: Observable<Time> = of({ minute: 0, second: 0 });
  isMobile: boolean = false;
  private readonly initialTotalSeconds = 300; // 5 minutes
  totalSeconds = 300; // 5 minutes

  constructor(
    private router: Router,
    public userService: UserService,
    private store: Store,
    public spinnerService: SpinnerService,
    public bg: BackgroundService
  ) { }

  ngOnInit(): void {
    this.requestBody = this.userService.getCurrentUrl();
    console.log('this is url', this.requestBody);
    this.checkMobile();
    this.generateBackground();
    // this.time();
  }

  navigation() {
    this.router.navigate([routes.dashboard]);
  }

  ngAfterViewInit(): void {
    this.setupInputNavigation();
    this.time();
  }

  private setupInputNavigation(): void {
    this.otpInputs.forEach((inputRef) => {
      const input = inputRef.nativeElement;

      input.addEventListener('input', () => this.handleInput(input));
      input.addEventListener('keydown', (e: KeyboardEvent) =>
        this.handleKeyDown(e, input),
      );
    });
  }

  private handleInput(input: HTMLInputElement): void {
    if (input.value.length === 1) {
      const nextIndex = parseInt(input.dataset['index']!) + 1;
      this.focusInputByIndex(nextIndex);
    }
  }

  private handleKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key === 'Backspace' && input.value.length === 0) {
      const prevIndex = parseInt(input.dataset['index']!) - 1;
      this.focusInputByIndex(prevIndex);
    }
  }

  private focusInputByIndex(index: number): void {
    const targetInput = this.otpInputs.find(
      (inputRef) => parseInt(inputRef.nativeElement.dataset['index']) === index,
    );
    targetInput?.nativeElement.focus();
  }

  // validate OTP
  validateOtp(): void {
    const otp = this.otpInputs
      .map((inputRef) => inputRef.nativeElement.value)
      .join('');
      console.log("otp", otp)

    if (otp.length === 6) {
      this.requestBody.otp = otp;
      console.log('request body:', this.requestBody);
      this.store.dispatch(new ConfirmOtp(this.requestBody));
      console.log('OTP submitted:', otp);
    } else {
      console.warn('Veuillez remplir tous les champs OTP');
    }
  }

  resendOtp(): void {
    // this.startTimer();
    // This method is used to resend the OTP
    this.sendOtp = false;
    setTimeout(() => {
      this.sendOtp = true;
    }, 30000); // 30 seconds cooldown
    delete this.requestBody.otp;
    console.log('request body: ', this.requestBody);
    this.store.dispatch(new ResendOtp(this.requestBody));
  }

  // startTimer(): void {
  //   console.log('Timer started');
  //   this.time.minute = 1;
  //   this.time.second = 10;
  //   const timer = setInterval(() => {
  //     if (this.time.second > 0) this.time.second--;
  //     if (this.time.second === 0 &&  this.time.minute > 0) {
  //        this.time.minute--;
  //       this.time.second = 59;
  //     }
  //     if (this.time.second === 0 &&  this.time.minute === 0) {
  //       console.log('Timer expired');
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }

  private checkMobile(): void {
      this.isMobile = window.innerWidth < 768;
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth < 768;
        if (this.isMobile) {
          this.generateBackground();
        }
      }
    );
  }

  private generateBackground(): void {
    if (this.isMobile) {
      this.bg.generateBackgroundIcons(25).subscribe(icons => {
        this.backgroundIcons = icons.map(icon => ({
          icon,
          position: this.bg.getRandomPosition(),
          size: this.bg.getRandomSize(20, 50),
          animationDelay: this.bg.getRandomAnimationDelay(5)
        }));
      });
    }
  }

  getIconPosition(): any {
    return this.bg.getRandomPosition();
  }

  getIconSize(): string {
    return this.bg.getRandomSize(20, 50);
  }

  getAnimationDelay(): string {
    return this.bg.getRandomAnimationDelay(5);
  }

  getIconStyle(icon: Icon): any {
    return {
      position: 'absolute',
      top: icon.position.top,
      left: icon.position.left,
      fontSize: icon.size,
      animationDelay: icon.animationDelay,
    };
  }

  time(): void {
    this.time$ = timer(0, 1000).pipe( // Émet une valeur toutes les secondes
      map(elapsedSeconds => {
        const remainingSeconds = this.totalSeconds - elapsedSeconds;
        if (remainingSeconds < 0) return { minute: 0, second: 0 }; // Arrêter le décompte
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return { minute: minutes, second: seconds };
      }),
      startWith(this.calculateInitialCountdownState()) // État initial
    );
  }

  // Fonction utilitaire pour calculer l'état initial
  private calculateInitialCountdownState(): Time {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    return { minute: minutes, second: seconds };
  }
}
