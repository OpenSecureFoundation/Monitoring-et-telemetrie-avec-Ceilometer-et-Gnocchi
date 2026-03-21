import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  AddPages,
  apiResultFormat,
  pageSelection,
} from 'src/app/core/models/models';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    standalone: false
})
export class PagesComponent {
  public pages: Array<AddPages> = [];
  Action = 'status';

  public routes = routes;
  isCollapsed = false;
    // pagination variables
    public pageSize = 10;
    public serialNumberArray: Array<number> = [];
    public totalData = 0;
    dataSource!: MatTableDataSource<AddPages>;
    public searchDataValue = '';
    //** / pagination variables
  public Toggledata = false;

  constructor(private data: DataService,private pagination: PaginationService , private router: Router) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.pages) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 
  
  private getTableData(pageOption: pageSelection): void {
    this.data.getaddpages().subscribe((apiRes: apiResultFormat) => {
      this.pages = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: AddPages, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.pages.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<AddPages>(this.pages);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.pages,
        serialNumberArray: this.serialNumberArray,
        tableData2: []
      });
    });
  }
   
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.pages = this.dataSource.filteredData;
  }


  public sortData(sort: Sort) {
    const data = this.pages.slice();

    if (!sort.active || sort.direction === '') {
      this.pages = data;
    } else {
      this.pages = data.sort((a, b) => {         
        const aValue = (a as never)[sort.active];         
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  isCollapsed1 = false;
  isCollapsed2 = false;

  users = [
    { name: 'Barbara Moore', checked: false },
    { name: 'Hendry Evan', checked: false },
    { name: 'Richard Miles', checked: false },
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
