import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFriendsModalComponent } from './user-friends-modal/user-friends-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MapViewDialogComponent } from './map-view-dialog/map-view-dialog.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CalendarComponent,
    UserFriendsModalComponent,
    InfoModalComponent,
    MapDialogComponent,
    MapViewDialogComponent
  ], 
  exports: [
    FooterComponent,
    HeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
