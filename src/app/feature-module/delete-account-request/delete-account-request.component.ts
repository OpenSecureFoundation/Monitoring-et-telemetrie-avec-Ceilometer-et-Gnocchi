import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  deleteaccount,
  pageSelection,
} from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-delete-account-request',
    templateUrl: './delete-account-request.component.html',
    styleUrls: ['./delete-account-request.component.scss'],
    standalone: false
})
export class DeleteAccountRequestComponent {
  showFilter = false;
  isCollapsed = false;
  public Toggledata = false;
  public routes = routes;
  public tableData: Array<deleteaccount> = [];

  public searchDataValue = '';
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<deleteaccount>;
  // pagination variables end

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.deleteaccountrequest) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getdeleteaccount().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: deleteaccount, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<deleteaccount>(this.tableData);
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
  open() {
    this.Toggledata = !this.Toggledata;
  }
  users = [
    { name: 'Pricilla Maureen', checked: false },
    { name: 'Randall Hollis', checked: false },
  ];
  user = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
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
