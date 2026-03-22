import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  invoicepaid,
  pageSelection,
} from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-invoices-paid',
    templateUrl: './invoices-paid.component.html',
    styleUrls: ['./invoices-paid.component.scss'],
    standalone: false
})
export class InvoicesPaidComponent {
  public tableData: Array<invoicepaid> = [];
  public routes = routes;
  isCollapsed = false;
  public Toggledata = false;

  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<invoicepaid>;

  // pagination variables end
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.invoicePaid) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getinvoicepaid().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: invoicepaid, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<invoicepaid>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableData2: [],
        serialNumberArray: this.serialNumberArray,
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
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;

  users1 = [
    { name: 'Pricilla', checked: false },
    { name: 'Randall', checked: false },
  ];
  users2 = [
    { name: '4991', checked: false },
    { name: '4992', checked: false },
    { name: '4993', checked: false },
  ];
  users3 = [
    { name: 'Software', checked: false },
    { name: 'Stationary', checked: false },
    { name: 'Designing', checked: false },
  ];
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
