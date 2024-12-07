import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss'],
})
export class MapDialogComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
  
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.map.invalidateSize(); 
      }, 0);
    });
  
    this.map.on('click', (event: any) => {
      const { lat, lng } = event.latlng;
      if (this.marker) {
        this.marker.setLatLng([lat, lng]); 
      } else {
        this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map); 
      }
    });
  }
  
  save(): void {
    if (this.marker) {
      const { lat, lng } = this.marker.getLatLng();
      this.dialogRef.close({ lat, lng });
    } else {
      this.dialogRef.close(null);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
