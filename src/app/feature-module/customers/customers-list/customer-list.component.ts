import { Component } from '@angular/core';
import { DataService, routes } from 'src/app/core/core.index';
import {
  pageSelection,
  apiResultFormat,
  customers,
} from 'src/app/core/models/models';
import { MatTableDataSource } from '@angular/material/table';

import { Sort } from '@angular/material/sort';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    standalone: false
})
export class CustomerListComponent {
  public customers: Array<customers> = [];
  isCollapsed = false;
  public showContent = false;
  public routes = routes;
  public toggleData = false;

  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<customers>;
  public searchDataValue = '';
  //** / pagination variables
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.customerList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getCustomers().subscribe((apiRes: apiResultFormat) => {
      this.customers = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: customers, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.customers.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<customers>(this.customers);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.customers,
        serialNumberArray: this.serialNumberArray,
        tableData2: [],
      });
    });
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.customers = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.customers.slice();

    if (!sort.active || sort.direction === '') {
      this.customers = data;
    } else {
      this.customers = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  openContent() {
    this.toggleData = !this.toggleData;
  }
  users = [
    { name: 'Pricilla Maureen', checked: false },
    { name: 'Randall Hollis', checked: false },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
