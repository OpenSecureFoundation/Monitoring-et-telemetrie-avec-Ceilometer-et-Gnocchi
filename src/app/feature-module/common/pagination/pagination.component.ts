/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {  pageSelection } from 'src/app/core/models/models';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnInit {
   
  public lastIndex = 0;
  @Input() public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;

  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  public localData: Array<string> = [];
  public sendData: Array<string> = [];

  paginationType = 'server';
  api = 'https://api.instantwebtools.net/v1/passenger?page=0&size=$100';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.serialNumberArray = [];
    this.getTableData();
  }

  private getTableData(): void {
    if (this.paginationType == 'local') {
      this.localData.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.sendData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.totalData = this.localData.length;
      this.calculateTotalPages(this.totalData, this.pageSize);
    } else if (this.paginationType == 'server') {
      this.http.get(this.api).subscribe((serverData: any) => {
        serverData.data.map((res: any, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            res.serialNumber = serialNumber;
            this.sendData.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.totalData = serverData.totalPassengers;
        this.calculateTotalPages(this.totalData, this.pageSize);
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

  public changePageSize(): void {
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
}
