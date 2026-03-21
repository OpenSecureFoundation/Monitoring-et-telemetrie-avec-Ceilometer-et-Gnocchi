import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { DataService, routes } from 'src/app/core/core.index';
import { apiResultFormat, pageSelection, productlist } from 'src/app/core/models/models';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})
export class ProductListComponent {
  
  public routes = routes;
  public productlist: Array<productlist> = [];
  isCollapsed = false;
 
  public Toggledata  = false;
    // pagination variables
    public pageSize = 10;
    public serialNumberArray: Array<number> = [];
    public totalData = 0;
    dataSource!: MatTableDataSource<productlist>;
    public searchDataValue = '';
    //** / pagination variables
  

  constructor(private data: DataService,private pagination: PaginationService , private router: Router) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.productlist) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

 
  
  private getTableData(pageOption: pageSelection): void {
    this.data.getProductlist().subscribe((apiRes: apiResultFormat) => {
      this.productlist = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: productlist, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.productlist.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<productlist>(this.productlist);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.productlist,
        serialNumberArray: this.serialNumberArray,
        tableData2: []
      });
    });
  }


  public sortData(sort: Sort) {
    const data = this.productlist.slice();

    if (!sort.active || sort.direction === '') {
      this.productlist = data;
    } else {
      this.productlist = data.sort((a, b) => {         
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
    { name: 'Lobar Handy', checked: false },
    { name: 'Woodcraft Sandal', checked: false },
    { name: 'Black Slim 200', checked: false },
    { name: 'Red Premium Handy', checked: false },
    { name: 'Bold V3.2', checked: false },
    { name: 'Iphone 14 Pro', checked: false }
  ];
  users2 = [
    { name: 'P125393', checked: false },
    { name: 'P125394', checked: false },
    { name: 'P125395', checked: false }
  ];
  users3 = [
    { name: 'Furnitures', checked: false },
    { name: 'Bags', checked: false },
    { name: 'Phone', checked: false }
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
  public toggleData  = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
