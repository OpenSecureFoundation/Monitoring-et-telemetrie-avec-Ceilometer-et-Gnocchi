import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  invoicecancelled,
  pageSelection,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-invoices-cancelled',
    templateUrl: './invoices-cancelled.component.html',
    styleUrls: ['./invoices-cancelled.component.scss'],
    standalone: false
})
export class InvoicesCancelledComponent implements OnInit {
  public invoice: Array<invoicecancelled> = [];
  public routes = routes;
  isCollapsed = false;
  public Toggledata = false;
  dataSource!: MatTableDataSource<invoicecancelled>;
  public searchDataValue = '';
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  //** / pagination variables

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getTableData();
  }
  private getTableData(): void {
    this.invoice = [];
    this.serialNumberArray = [];

    this.data.getinvoicecancelled().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: invoicecancelled, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.invoiceId = serialNumber;
          this.invoice.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<invoicecancelled>(this.invoice);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.invoice.slice();

    if (!sort.active || sort.direction === '') {
      this.invoice = data;
    } else {
      this.invoice = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }
  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;

  users1 = [
    { name: 'Pricilla', checked: false },
    { name: 'Randall', checked: false },
  ];
  users2 = [
    { name: '4991', checked: false },
    { name: '4992', checked: false },
    { name: '4993', checked: false },
  ];
  users3 = [
    { name: 'Software', checked: false },
    { name: 'Stationary', checked: false },
    { name: 'Designing', checked: false },
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
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
