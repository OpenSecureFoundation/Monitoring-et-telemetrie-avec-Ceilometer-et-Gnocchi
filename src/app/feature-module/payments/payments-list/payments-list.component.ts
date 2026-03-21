import { Component} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { DataService, routes } from 'src/app/core/core.index';
import { apiResultFormat, pageSelection, payments } from 'src/app/core/models/models';


@Component({
    selector: 'app-payments-list',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.scss'],
    standalone: false
})
export class PaymentsListComponent {
  isCollapsed = false;
  isCollapsed2 = false;
  payments: Array<payments> = [];
  showFilter = false;
  public Toggledata  = false;
  public routes = routes;
   // pagination variables
   public pageSize = 10;
   public serialNumberArray: Array<number> = [];
   public totalData = 0;
   dataSource!: MatTableDataSource<payments>;
   public searchDataValue = '';
   //** / pagination variables

  constructor(private data: DataService,private pagination: PaginationService , private router: Router) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.paymentsList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

 

  private getTableData(pageOption: pageSelection): void {
    this.data.getPaymentList().subscribe((apiRes: apiResultFormat) => {
      this.payments = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: payments, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.payments.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<payments>(this.payments);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.payments,
        serialNumberArray: this.serialNumberArray,
        tableData2: []
      });
    });
  }

    
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.payments = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.payments.slice();

    if (!sort.active || sort.direction === '') {
      this.payments = data;
    } else {
      this.payments = data.sort((a, b) => {         
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
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  users2 = [
    { name: '25689826', checked: false },
    { name: '25689827', checked: false },
   
  ];
}
