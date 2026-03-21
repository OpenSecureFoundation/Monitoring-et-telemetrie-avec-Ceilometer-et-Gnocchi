import { Component} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, routes } from 'src/app/core/core.index';
import { apiResultFormat, messages, pageSelection } from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/custom-pagination/pagination.service';

@Component({
    selector: 'app-contact-messages',
    templateUrl: './contact-messages.component.html',
    styleUrls: ['./contact-messages.component.scss'],
    standalone: false
})
export class ContactMessagesComponent  {
  public messages: Array<messages> = [];
  public Toggledata  = false;
  isCollapsed = false;
  
  public routes = routes;
  
  public searchDataValue = '';
   // pagination variables
   public pageSize = 10;
   public serialNumberArray: Array<number> = [];
   public tableData: Array<messages> = [];
   public totalData = 0;
   dataSource!: MatTableDataSource<messages>;
   // pagination variables end
  

  constructor(private data: DataService, private pagination: PaginationService,
    private router: Router) {
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.contactmessages) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    }
    private getTableData(pageOption: pageSelection): void {
      this.data.getMessages().subscribe((apiRes: apiResultFormat) => {
        this.tableData = [];
        this.serialNumberArray = [];
        this.totalData = apiRes.totalData;
        apiRes.data.map((res: messages, index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            res.sNo = serialNumber;
            this.tableData.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<messages>(this.tableData);
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
      { name: 'Barbara Moore', checked: false },
      { name: 'Hendry Evan', checked: false },
      { name: 'Richard Miles', checked: false }
    ];
    users2 = [
      { name: 'Stationary', checked: false },
      { name: 'Medical', checked: false },
      { name: 'Designing', checked: false }
    ];
    
    toggleCollapse1() {
      this.isCollapsed1 = !this.isCollapsed1;
    }
    toggleCollapse2() {
      this.isCollapsed2 = !this.isCollapsed2;
    }
    public toggleData  = false;
    openContent() {
      this.toggleData = !this.toggleData;
    }
}
