/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

@Component({
    selector: 'app-form-fileupload',
    templateUrl: './form-fileupload.component.html',
    styleUrls: ['./form-fileupload.component.scss'],
    standalone: false
})
export class FormFileuploadComponent {
 

  // single file
  singleFileName = 'Choose file..';
  singleFileImage!: File;
  selectedImage = 'assets/img/fileImage.png';
  // single file
  // multiple file
  multipleFileName: Array<string> = ['Choose file..'];
  multipleFileImages!: Array<File>;
  selectedImages: Array<string> = ['assets/img/fileImage.png'];
  // multiple file

  

  onFileChange(event: any): void {
    if (event.target.files.length == 0) {
      this.singleFileImage = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.singleFileImage);
      reader.onload = (res: any) => {
        this.selectedImage = res.target.result;
      };
      this.singleFileName = this.singleFileImage.name;
      event.target.value = '';
    }
    if (event.target.files.length > 0) {
      // this.multipleFileName;
      if (this.multipleFileName[0] == 'Choose file..') {
        this.multipleFileName = [];
      }

      const image: Array<File> = event.target.files;
      Array.from(image).map((obj) => {
        const reader = new FileReader();
        this.multipleFileName.push(obj.name);
        reader.readAsDataURL(obj);
        reader.onload = (res: any) => {
          this.selectedImages.push(res.target.result);
        };
      });

      event.target.value = '';
    }
  }

  clearSingleImage(): void {
    this.singleFileName = 'Choose file..';
    this.selectedImage = 'assets/img/fileImage.png';
  }
  clearMultipleImage(): void {
    this.multipleFileName = ['Choose file..'];
    this.selectedImages = ['assets/img/fileImage.png'];
  }
  removeSingleImage(index: number, value: any): void {
    this.multipleFileName.splice(value, 1);
    this.selectedImages.splice(index, 1);
    if (this.multipleFileName.length == 0) {
      this.multipleFileName = ['Choose file..'];
    }
  }
}
