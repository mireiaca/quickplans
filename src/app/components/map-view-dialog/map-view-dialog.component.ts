import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view-dialog',
  templateUrl: './map-view-dialog.component.html',
  styleUrls: ['./map-view-dialog.component.scss'],
})
export class MapViewDialogComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(
    public dialogRef: MatDialogRef<MapViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setMarker(lat: number, lng: number): void {
    this.marker.setLatLng([lat, lng]);
    this.map.setView([lat, lng], 13);
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([this.data.center.lat, this.data.center.lng], 13);
  
    L.Icon.Default.mergeOptions({
      iconUrl: '../assets/images/marker-icon.png',
      iconRetinaUrl: '../assets/images/marker-icon.png',
      shadowUrl: '../assets/images/marker-shadow.png',
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  
    this.marker = L.marker([this.data.center.lat, this.data.center.lng]).addTo(this.map);
  
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.map.invalidateSize(); 
      }, 0);
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}