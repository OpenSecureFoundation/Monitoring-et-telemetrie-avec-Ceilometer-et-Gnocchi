import { Component, Renderer2, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { CommonService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  paymentreport,
  pageSelection,
} from 'src/app/core/models/models';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
    selector: 'app-payment-report',
    templateUrl: './payment-report.component.html',
    styleUrls: ['./payment-report.component.scss'],
    standalone: false
})
export class PaymentReportComponent implements OnDestroy {
  isCollapsed = false;
  isCollapsed2 = false;
  myDateValue!: Date;
  myDateValue2!: Date;
  showFilter = false;
  public Toggledata = false;
  public routes = routes;
  public expensereport: Array<paymentreport> = [];
  public baseRoute = '';
  public pageRoute = '';
  public lastRoute = '';
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<paymentreport>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private common: CommonService,
    private renderer: Renderer2,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.common.baseRoute.subscribe((baseRoute: string) => {
      this.baseRoute = baseRoute;
    });
    this.common.pageRoute.subscribe((pageRoute: string) => {
      this.pageRoute = pageRoute;
      if (this.pageRoute == 'payment-report') {
        this.renderer.addClass(document.body, 'date-pickers');
      }
    });
    this.common.lastRoute.subscribe((lastRoute: string) => {
      this.lastRoute = lastRoute;
    });
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.paymentReport) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'date-pickers');
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.paymentReport().subscribe((apiRes: apiResultFormat) => {
      this.expensereport = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: paymentreport, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.expensereport.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<paymentreport>(
        this.expensereport,
      );
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.expensereport,
        serialNumberArray: this.serialNumberArray,
        tableData2: [],
      });
    });
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.expensereport = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.expensereport.slice();

    if (!sort.active || sort.direction === '') {
      this.expensereport = data;
    } else {
      this.expensereport = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  openContent() {
    this.Toggledata = !this.Toggledata;
  }
  users = [
    { name: 'Sumo Soft Limited', checked: false },
    { name: ' Repair Group Co', checked: false },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
}
