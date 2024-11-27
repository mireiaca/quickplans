import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CalendarComponent
  ], 
  exports: [
    FooterComponent,
    HeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
