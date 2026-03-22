/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    standalone: false
})
export class CounterComponent  {
  clients = 0;
  sales = 0;
  projects = 0;

  countUP = 0;
  countDownFromThree = 259200;
  countDownFromThirty = 30;
  countDownFromTen = 10;

  countFromZero= '00 Day 00 : 00 : 00';
  countFromThree = '00 Day 00 : 03 : 00';   
  countFromThirty = '00 Day 00 : 00 : 30';
  countFromTen = '00 Day 00 : 00 : 10';
  countFromThreeWithUnit = '00 Day 00 : 00 : 10';
   
  firstCounter: any;
  secondCounter: any;
  thirdCounter: any;
  fourthCounter: any;

  constructor() {
    this.startTimer();
    this.startCounter();
  }

  

  private startCounter(): void {
    /* eslint no-var: off */
    for (var i = 0; i < 3000; i++) {
      for (var i = 0; i < 10000; i++) {
        for (var i = 0; i < 15000; i++) {
          setTimeout(() => {
            if (this.clients < 3000) this.clients++;
            if (this.sales < 10000) this.sales++;
            if (this.projects < 15000) this.projects++;
          });
        }
      }
    }
  }

  private startTimer() {
    this.firstCounter = setInterval(() => {
      if (this.countUP === 0) {
        this.countUP++;
      } else {
        this.countUP++;
      }
      this.countFromZero = this.transform(this.countUP);
    }, 1000);

    this.secondCounter = setInterval(() => {
      if (this.countDownFromThree === 0) {
        this.countDownFromThree--;
      } else {
        this.countDownFromThree--;
      }
      this.countFromThree = this.transform(this.countDownFromThree);
      this.countFromThreeWithUnit = this.transformWithUnit(
        this.countDownFromThree
      );
    }, 1000);
    this.thirdCounter = setInterval(() => {
      if (this.countDownFromThirty <= 30 && this.countDownFromThirty > 20) {
        this.countDownFromThirty--;
      }
      this.countFromThirty = this.transform(this.countDownFromThirty);
    }, 1000);
    this.fourthCounter = setInterval(() => {
      if (this.countDownFromTen <= 10 && this.countDownFromTen >= 1) {
        this.countDownFromTen--;
      }
      this.countFromTen = this.transform(this.countDownFromTen);
    }, 1000);
  }
  private transform(value: number): string {
    const space = ' ';
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    return (
      days +
      space +
      'Day' +
      space +
      (hours - days * 24) +
      space +
      ':' +
      space +
      (minutes - days * 1440 - (hours - days * 24) * 60) +
      space +
      ':' +
      space +
      seconds
    );
  }

  private transformWithUnit(value: number): string {
    const space = ' ';
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    return (
      days +
      space +
      ' Day' +
      space +
      (hours - days * 24) +
      ' Hours' +
      space +
      ':' +
      space +
      (minutes - days * 1440 - (hours - days * 24) * 60) +
      ' Minutes ' +
      space +
      ':' +
      space +
      seconds +
      ' Sec..'
    );
  }
}