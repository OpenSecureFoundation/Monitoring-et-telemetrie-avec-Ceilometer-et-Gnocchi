import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class BackgroundService {

  private backgroundIcons = new BehaviorSubject<string[]>([]);
  private readonly SECURITY_ICONS = ['🔒', '🔑', '🛡️', '🔍', '📱', '💻', '🌐', '🔓', '📡', '🔐', '🖥️', '📶'];

  constructor() { }

  generateBackgroundIcons(count: number): Observable<string[]> {
    const icons = Array.from({ length: count }, () =>
      this.SECURITY_ICONS[Math.floor(Math.random() * this.SECURITY_ICONS.length)]
    );
    this.backgroundIcons.next(icons);
    return this.backgroundIcons.asObservable();
  }

  getRandomPosition(): { top: string, left: string } {
    return {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    };
  }

  getRandomSize(min: number, max: number): string {
    const size = min + Math.random() * (max - min);
    return `${size}px`;
  }

  getRandomAnimationDelay(max: number): string {
    return `${Math.random() * max}s`;
  }
}
