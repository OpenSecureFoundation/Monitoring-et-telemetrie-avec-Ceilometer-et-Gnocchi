/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { routes, SideBarService } from 'src/app/core/core.index';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  fill: ApexFill | any;
  labels: string[] | any;
  marker: string[] | any;
  colors: string[];
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public layoutPosition = '1';
  public routes = routes;

  constructor(private sideBar: SideBarService) {
    this.chartOptions = {
      series: [
        {
          name: 'Received',
          data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50],
          colors: ['#7539FF'],
        },

        {
          name: 'Pending',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80],
          colors: ['#fda600'],
        },
      ],

      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 5,
          borderRadiusOnAllStackedSeries: true,
          borderRadiusApplication: 'end',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        markers: {
          fillColors: ['#7638ff', '#fda600'],
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
        colors: ['#7638ff', '#fda600'],
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
    this.chartOptions2 = {
      colors: ['#7638ff', '#ff737b', 'rgb(118, 56, 255)', '#1ec1b0'],
      series: [55, 40, 20, 10],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins, sans-serif',
        height: 320,
      },
      labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
      legend: { show: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
              height: 200,
            },
            legend: { position: 'bottom' },
          },
        },
      ],
    };

    // <* to check layout position *>
    this.sideBar.layoutPosition.subscribe((res) => {
      this.layoutPosition = res;
    });
    // <* to check layout position *>
  }
}
