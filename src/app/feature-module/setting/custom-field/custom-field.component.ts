import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { routes, DataService } from 'src/app/core/core.index';
import {
  customField,
  pageSelection,
  apiResultFormat,
} from 'src/app/core/models/models';
interface data {
  value: string;
}

@Component({
    selector: 'app-custom-field',
    templateUrl: './custom-field.component.html',
    styleUrls: ['./custom-field.component.scss'],
    standalone: false
})
export class CustomFieldComponent implements OnInit {
  public customField: Array<customField> = [];
  dataSource!: MatTableDataSource<customField>;
  public routes = routes;
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
    this.customField = [];
    this.serialNumberArray = [];

    this.data.getCustomField().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: customField, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.customField.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<customField>(this.customField);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.customField = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.customField.slice();

    if (!sort.active || sort.direction === '') {
      this.customField = data;
    } else {
      this.customField = data.sort((a, b) => {
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
  public selectedValue1 = '';
  public selectedValue2 = '';

  selectedList1: data[] = [
    { value: 'Plan' },
    { value: 'Companies' },
    { value: 'Ledger' },
    { value: 'Packages' },
  ];
  selectedList2: data[] = [
    { value: 'Text' },
    { value: 'Email' },
    { value: 'Textarea' },
  ];
  isCollapsed = false;
  users = [
    { name: 'Barbara Moore', checked: false },
    { name: 'Hendry Evan', checked: false },
    { name: 'Richard Miles', checked: false },
  ];
  usersTwo = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
