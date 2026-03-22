import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  pageSelection,
  planBilling,
  planBillingOwl,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-plan-billing',
    templateUrl: './plan-billing.component.html',
    styleUrls: ['./plan-billing.component.scss'],
    standalone: false
})
export class PlanBillingComponent implements OnInit {
  public planBillingOwl: planBillingOwl[];
  public planBillingOption: OwlOptions = {
    loop: true,
    margin: 24,
    items: 2,
    nav: false,
    dots: true,
    autoplay: false,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1119: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  };
  public planBilling: Array<planBilling> = [];
  dataSource!: MatTableDataSource<planBilling>;
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

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.planBilling = [];
    this.serialNumberArray = [];

    this.data.getPlanBilling().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: planBilling, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.planBilling.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<planBilling>(this.planBilling);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.planBilling = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.planBilling.slice();

    if (!sort.active || sort.direction === '') {
      this.planBilling = data;
    } else {
      this.planBilling = data.sort((a, b) => {
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
  constructor(private data: DataService) {
    this.planBillingOwl = this.data.planBillingOwl;
  }
}
