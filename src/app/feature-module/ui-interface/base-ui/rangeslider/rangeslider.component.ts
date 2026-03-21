import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component} from '@angular/core';


@Component({
    selector: 'app-rangeslider',
    templateUrl: './rangeslider.component.html',
    styleUrls: ['./rangeslider.component.scss'],
    standalone: false
})
export class RangesliderComponent  {

  value = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };

  value1 = 40;
  options1: Options = {
    floor: 0,
    ceil: 200
  };

  values = 40;
  highValue = 60;
  option: Options = {
    floor: 0,
    ceil: 100
  };

  minValue = 100;
  maxValue = 400;
  options2: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  value3 = -500;
  highValue3 = 500;
  options3: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true,
    stepsArray: [
      { value: 1, legend: "-1000" },
      { value: 2 },
      { value: 3, legend: "-500" },
      { value: 4 },
      { value: 5, legend: "0" },
      { value: 6 },
      { value: 7, legend: "500" },
      { value: 8 },
      { value: 9, legend: "1000" }
    ]
  };

  value4 = -500;
  highValue4 = 500;
  options4: Options = {
    floor: 0,
    ceil: 50,
    step: 10,
    showTicks: true,
    stepsArray: [
      { value: 1, legend: "-1000" },
      { value: 2 },
      { value: 3, legend: "-500" },
      { value: 4 },
      { value: 5, legend: "0" },
      { value: 6 },
      { value: 7, legend: "500" },
      { value: 8 },
      { value: 9, legend: "1000" }
    ]
  };

  value5 = 10;
  highValue5 = 90;
  options5: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };

  value6 = 0
  highValue6 = 500;
  options6: Options = {
    floor: 0,
    ceil: 50,
    step: 10,
    showTicks: true,
    stepsArray: [
      { value: 1, legend: "Jan" },
      { value: 2 },
      { value: 3, legend: "Feb" },
      { value: 4 },
      { value: 5, legend: "Mar" },
      { value: 6 },
      { value: 7, legend: "Apr" },
      { value: 8 },
      { value: 9, legend: "May" },
      { value: 10 },
      { value: 11, legend: "Jun" },
      { value: 12 },
      { value: 13, legend: "July" },
      { value: 14 },
      { value: 15, legend: "Aug" },
      { value: 16 },
      { value: 17, legend: "Sep" },
      { value: 18 },
      { value: 19, legend: "Oct" },
      { value: 20 },
      { value: 21, legend: "Nov" },
      { value: 22 },
      { value: 23, legend: "Dec" }
    ]
  };
 
 
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
 
  formatLabel1(value: number): string {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }
    switch(value){
      case 1 : return 'Jan';
      
      case 2 : return 'Feb';
      
      case 3 : return 'Mar';
      
      case 4 : return 'Apr';
      
      case 5 : return 'May';
      
      case 6 : return 'Jun';
      
      case 7 : return 'Jly';
      
      case 8 : return 'Aug';
      
      case 9 : return 'Sep';
      
      case 10 : return 'Oct';
      
      case 11 : return 'Nov';
      
      case 12 : return 'Dec';
      
    }
    return `${value}`;
  }
}
