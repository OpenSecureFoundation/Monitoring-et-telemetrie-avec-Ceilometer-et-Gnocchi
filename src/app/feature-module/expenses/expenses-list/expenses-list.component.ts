import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  expense,
  pageSelection,
} from 'src/app/core/models/models';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-expenses-list',
    templateUrl: './expenses-list.component.html',
    styleUrls: ['./expenses-list.component.scss'],
    standalone: false
})
export class ExpensesListComponent  {
  isCollapsed = false;
  public tableData: Array<expense> = [];
  
  country = 'India';
  payment = 'none';
  mode = 'payment';
  showFilter = false;
  public Toggledata = false;
  public routes = routes;
  

  public searchDataValue = '';
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<expense>;
  // pagination variables end
  constructor(private data: DataService,private pagination: PaginationService,
    private router: Router) { 
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.expensesList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });}
    private getTableData(pageOption: pageSelection): void {
      this.data.getExpensesList().subscribe((apiRes: apiResultFormat) => {
        this.tableData = [];
        this.serialNumberArray = [];
        this.totalData = apiRes.totalData;
        apiRes.data.map((res: expense, index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            res.sNo = serialNumber;
            this.tableData.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<expense>(this.tableData);
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

  users1 = [
    { name: '148065', checked: false },
    { name: '148066', checked: false },
  ];

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
  files: File[] = [];

  paymentstatus = 'selectpaymentstatus';
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
