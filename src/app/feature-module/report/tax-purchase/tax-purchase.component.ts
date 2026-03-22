import { OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes, DataService, CommonService } from 'src/app/core/core.index';
import {
  pageSelection,
  apiResultFormat,
  url,
  taxPurchase,
} from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-tax-purchase',
    templateUrl: './tax-purchase.component.html',
    styleUrls: ['./tax-purchase.component.scss'],
    standalone: false
})
export class TaxPurchaseComponent implements OnDestroy {
  baseRoute = '';
  pageRoute = '';
  lastRoute = '';
  isCollapsed2 = false;
  isCollapsed1 = false;
  public toggleData = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  public routes = routes;
  public tableData: Array<taxPurchase> = [];
  public tableData2: Array<taxPurchase> = [];

  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<taxPurchase>;
  // pagination variables end

  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private common: CommonService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.common.baseRoute.subscribe((res: string) => {
      this.baseRoute = res;
    });
    this.common.pageRoute.subscribe((res: string) => {
      this.pageRoute = res;
    });
    this.common.lastRoute.subscribe((res: string) => {
      this.lastRoute = res;
    });
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.taxPurchase) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.taxPurchase) {
        this.getTableData2({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    if (this.pageRoute == 'tax-purchase') {
      this.renderer.addClass(document.body, 'date-range-picker');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'date-range-picker');
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getTaxPurchase().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: taxPurchase, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<taxPurchase>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
        tableData2: [],
      });
    });
  }
  private getTableData2(pageOption: pageSelection): void {
    this.data.getTaxPurchase2().subscribe((apiRes: apiResultFormat) => {
      this.tableData2 = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: taxPurchase, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData2.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<taxPurchase>(this.tableData2);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData2: [],
        serialNumberArray: this.serialNumberArray,
        tableData: [],
      });
    });
  }
  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public sortData2(sort: Sort) {
    const data = this.tableData2.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData2 = data;
    } else {
      this.tableData2 = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.baseRoute.next(splitVal[1]);
    this.common.pageRoute.next(splitVal[2]);
    this.common.lastRoute.next(splitVal[3]);
  }
  openContent() {
    this.toggleData = !this.toggleData;
  }
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  users1 = [
    { name: '893246', checked: false },
    { name: '457289', checked: false },
  ];
}
