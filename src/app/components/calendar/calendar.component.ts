import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  daysInMonth: number[] = [];
  events: { [key: string]: string[] } = {};

  constructor() {
    this.generateCalendar();
  }
  ngOnInit(): void {
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.currentDate = new Date(year, month, 1);
    this.daysInMonth = Array(firstDay).fill(0).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }

  // Cambiar mes
  changeMonth(delta: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    this.generateCalendar();
  }

  // Añadir evento
  addEvent(date: string, eventName: string) {
    if (!this.events[date]) {
      this.events[date] = [];
    }
    this.events[date].push(eventName);
  }

  // Obtener eventos por día
  getEvents(day: number) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.events[date] || [];
  }



showModal = false;
selectedDay: number | null = null;
newEventName = '';

openAddEventModal(day: number) {
  this.selectedDay = day;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.newEventName = '';
}

addEventToSelectedDate() {
  if (this.selectedDay !== null && this.newEventName.trim()) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;
    const date = `${year}-${String(month).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')}`;

    this.addEvent(date, this.newEventName.trim());
    this.closeModal();
  }
}
}