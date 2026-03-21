/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lightbox } from 'ngx-lightbox';
import { DataService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  invoiceone,
  pageSelection,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-template-invoice',
    templateUrl: './template-invoice.component.html',
    styleUrls: ['./template-invoice.component.scss'],
    standalone: false
})
export class TemplateInvoiceComponent {
  public routes = routes;
  dataSource!: MatTableDataSource<invoiceone>;
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

  public albumsOne: { src: string; title: string }[] = [];
  public albumsTwo: any = [];
  public albumsThree: { src: string; title1: string }[] = [];
  public albumsFour: any = [];

  constructor(private _lightbox: Lightbox, private data: DataService) {
    for (let i = 1; i <= 5; i++) {
      const src = 'assets/img/invoice-' + i + '.jpg';
      const src2 = 'assets/img/invoice-' + i + '.svg';
      const title = 'General Invoice ' + i;
      const title1 = 'Receipt Invoice' + i;
      const src3 = 'assets/img/invoices/recepit-' + i + '.jpg';
      const src4 = 'assets/img/cash-recepit-' + i + '.svg';

      // const caption = 'Image ' + i + ' caption here';

      this.albumsOne.push({ src: src, title: title });
      this.albumsTwo.push({ src: src2 });
      this.albumsThree.push({ src: src3, title1: title1 });
      this.albumsFour.push({ src: src4 });
    }
  }
  open(index: number, albumArray: Array<any>): void {
    this._lightbox.open(albumArray, index);
  }
  close(): void {
    this._lightbox.close();
  }
  public invoiceone: Array<invoiceone> = [];
  private getTableData(): void {
    this.invoiceone = [];
    this.serialNumberArray = [];

    this.data.getinvoiceone().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: invoiceone, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.invoiceone.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<invoiceone>(this.invoiceone);
    });
  }
}
