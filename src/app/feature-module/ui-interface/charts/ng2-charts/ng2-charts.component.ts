import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
   
@Component({
    selector: 'app-ng2-charts',
    templateUrl: './ng2-charts.component.html',
    styleUrls: ['./ng2-charts.component.scss'],
    standalone: false
})
export class Ng2ChartsComponent  {
 

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public transparencyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [14, 12, 34, 25, 24, 20],
        label: 'Sales',
        backgroundColor: '#ffff',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  public gradientChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [14, 12, 34, 25, 24, 20],
        label: 'Sales',

        backgroundColor: '#2b93df',
      },
    ],
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };

 
}
