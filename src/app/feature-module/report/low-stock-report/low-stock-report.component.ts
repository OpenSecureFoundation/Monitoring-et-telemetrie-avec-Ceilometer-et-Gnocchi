import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  stockreport,
  pageSelection,
} from 'src/app/core/models/models';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
    selector: 'app-low-stock-report',
    templateUrl: './low-stock-report.component.html',
    styleUrls: ['./low-stock-report.component.scss'],
    standalone: false
})
export class LowStockReportComponent {
  myDateValue!: Date;
  myDateValue2!: Date;
  showFilter = false;
  public Toggledata = false;
  public routes = routes;
  public expensereport: Array<stockreport> = [];
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<stockreport>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.lowStockReport) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getstockReport().subscribe((apiRes: apiResultFormat) => {
      this.expensereport = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: stockreport, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.expensereport.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<stockreport>(this.expensereport);
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

  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;

  users = [
    { name: 'Lobar Handy', checked: false },
    { name: 'Woodcraft Sandal', checked: false },
    { name: 'Black Slim 200', checked: false },
    { name: 'Red Premium Handy', checked: false },
    { name: 'Bold V3.2', checked: false },
    { name: 'Iphone 14 Pro', checked: false },
  ];
  users2 = [{ name: 'PPT005', checked: false }];
  users3 = [{ name: 'Furnitures', checked: false }];
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  toggleCollapse3() {
    this.isCollapsed3 = !this.isCollapsed3;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
