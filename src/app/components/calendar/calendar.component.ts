import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  calendarPlugins = [dayGridPlugin, interactionPlugin]; 
  calendarEvents = [
    { title: 'Evento 1', date: '2024-11-10' },
    { title: 'Evento 2', date: '2024-11-15' }
  ];
}
