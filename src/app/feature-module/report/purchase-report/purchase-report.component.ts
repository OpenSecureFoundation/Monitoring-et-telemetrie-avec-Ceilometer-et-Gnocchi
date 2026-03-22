import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  pageSelection,
  purchasereport,
} from 'src/app/core/models/models';
import { DataService } from 'src/app/core/services/data/data.service';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-purchase-report',
    templateUrl: './purchase-report.component.html',
    styleUrls: ['./purchase-report.component.scss'],
    standalone: false
})
export class PurchaseReportComponent {
  isCollapsed = false;
  public Toggledata = false;
  showFilter = false;
  public routes = routes;
  public tableData: Array<purchasereport> = [];
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<purchasereport>;
  // pagination variables end

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.purchaseReport) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getPurchaseReport().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: purchasereport, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<purchasereport>(this.tableData);
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

  users = [
    { name: 'Lobar Handy', checked: false },
    { name: 'Woodcraft Sandal', checked: false },
    { name: 'Black Slim 200', checked: false },
    { name: 'Red Premium Handy', checked: false },
    { name: 'Bold V3.2', checked: false },
    { name: 'Iphone 14 Pro', checked: false },
  ];
  users2 = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
