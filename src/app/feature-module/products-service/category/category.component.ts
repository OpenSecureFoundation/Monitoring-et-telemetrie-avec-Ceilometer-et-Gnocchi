import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { DataService, routes } from 'src/app/core/core.index';
import { apiResultFormat, category, pageSelection } from 'src/app/core/models/models';


@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    standalone: false
})
export class CategoryComponent  {
  public routes = routes;
  public category: Array<category> = [];
  isCollapsed = false;
  parent = 'none';
  parent2 = 'none';
 
  public Toggledata  = false;
    // pagination variables
    public pageSize = 10;
    public serialNumberArray: Array<number> = [];
    public totalData = 0;
    dataSource!: MatTableDataSource<category>;
    public searchDataValue = '';
    //** / pagination variables
  

  constructor(private data: DataService,private pagination: PaginationService , private router: Router) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.category) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

 
  
  private getTableData(pageOption: pageSelection): void {
    this.data.getCategory().subscribe((apiRes: apiResultFormat) => {
      this.category = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: category, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.category.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<category>(this.category);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.category,
        serialNumberArray: this.serialNumberArray,
        tableData2: []
      });
    });
  }
  
  public sortData(sort: Sort) {
    const data = this.category.slice();

    if (!sort.active || sort.direction === '') {
      this.category = data;
    } else {
      this.category = data.sort((a, b) => {         
        const aValue = (a as never)[sort.active];         
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  files: File[] = [];
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event:File) {
   this.files.splice(this.files.indexOf(event), 1);
  }
  isCollapsed1 = false;

  users = [
    { name: 'Laptop', checked: false },
    { name: 'Shoes', checked: false },
    { name: 'Accessories ', checked: false },
    { name: 'Phone ', checked: false },
    { name: 'Bags ', checked: false },
    { name: 'Speaker  ', checked: false },
  ];
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  public toggleData  = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
