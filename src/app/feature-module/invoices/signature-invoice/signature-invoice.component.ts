import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { apiResultFormat, editcreditnotes, pageSelection } from 'src/app/core/models/models';
import { DataService } from 'src/app/core/services/data/data.service';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
    selector: 'app-signature-invoice',
    templateUrl: './signature-invoice.component.html',
    styleUrls: ['./signature-invoice.component.scss'],
    standalone: false
})
export class SignatureInvoiceComponent {
  public tableData: Array<editcreditnotes
  > = [];
  customer = 'customer1';
  status = 'Unpaid'
  public selectedValue !: string | number ;
  public editcreditnotes: Array<editcreditnotes> = [];
  country = 'India';
  product='Product 1';
  percentage='percentage1';
  tax = "customer1";
  selectbank='bank'
  select = 'bank'
  myDateValue!: Date;
  public minDate!: Date;
  public maxDate!: Date;
   // pagination variables
   public pageSize = 10;
   public serialNumberArray: Array<number> = [];
   public totalData = 0;
   dataSource!: MatTableDataSource<editcreditnotes
   >;
 
   // pagination variables end

 
  
  public routes = routes
  public Toggledata  = false;
  
  
  
 
  constructor(private data: DataService, private pagination: PaginationService,
    private router: Router) {
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.blogcomments) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    }

    private getTableData(pageOption: pageSelection): void {
      this.data.getblogcomments().subscribe((apiRes: apiResultFormat) => {
        this.tableData = [];
        this.serialNumberArray = [];
        this.totalData = apiRes.totalData;
        apiRes.data.map((res: editcreditnotes
          , index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            res.sNo = serialNumber;
            this.tableData.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<editcreditnotes
        >(this.tableData);
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
  files: File[] = [];
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event:File) {
   this.files.splice(this.files.indexOf(event), 1);
  }
  
 
}
