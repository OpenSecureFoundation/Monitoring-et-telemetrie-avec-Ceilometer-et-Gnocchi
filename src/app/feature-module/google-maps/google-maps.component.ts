import { Component, OnInit } from '@angular/core';

export interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
}
@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
    standalone: false
})
export class GoogleMapsComponent implements OnInit {
  options!: MapOptions;

  ngOnInit(): void {
    this.options = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 3,
    };
  }
}
