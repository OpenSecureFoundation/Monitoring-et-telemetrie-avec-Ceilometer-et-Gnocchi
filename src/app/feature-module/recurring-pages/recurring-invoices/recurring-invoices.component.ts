import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  pageSelection,
  recurringinvoice,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-recurring-invoices',
    templateUrl: './recurring-invoices.component.html',
    styleUrls: ['./recurring-invoices.component.scss'],
    standalone: false
})
export class RecurringInvoicesComponent {
  public recurringinvoice: Array<recurringinvoice> = [];
  public routes = routes;
  isCollapsed = false;
  public Toggledata = false;
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<recurringinvoice>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.recurringinvoices) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.recurringinvoice().subscribe((apiRes: apiResultFormat) => {
      this.recurringinvoice = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: recurringinvoice, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.recurringinvoice.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<recurringinvoice>(
        this.recurringinvoice,
      );
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.recurringinvoice,
        serialNumberArray: this.serialNumberArray,
        tableData2: [],
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.recurringinvoice.slice();

    if (!sort.active || sort.direction === '') {
      this.recurringinvoice = data;
    } else {
      this.recurringinvoice = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  isCollapsed1 = false;

  users1 = [
    { name: 'Pricilla', checked: false },
    { name: 'Randall', checked: false },
  ];

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
