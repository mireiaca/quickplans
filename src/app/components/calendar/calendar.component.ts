import { Component, Input, OnInit } from '@angular/core';
import { QuickplanService } from '../../services/quickplans/quickplan.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../../pages/user/user-profile/user-profile.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  daysInMonth: number[] = [];
  events: { [key: string]: string[] } = {};

  @Input() username: string = '';

  constructor(
    private quickplanService: QuickplanService,
    private dialog: MatDialog
  ) {
    this.generateCalendar();
  }
  ngOnInit(): void {
    this.obtenerQuickplansCurrentUser();
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

  obtenerQuickplansCurrentUser() {
    
    if(this.username == '') {
      this.quickplanService.getQuickplansAgregados().subscribe((quickplans: any) => {
        quickplans.forEach((quickplan: any) => { 
          if (quickplan?.Fecha_Incio && quickplan?.Titulo) {
            const date = new Date(quickplan.Fecha_Incio);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
            if (!this.events[dateKey]) {
              this.events[dateKey] = [];
            }
            this.events[dateKey].push(quickplan.Titulo);
          }
        });
      });
    } else if(this.username != '') {
      this.quickplanService.getQuickplansAgregadosOtherUser(this.username).subscribe((quickplans: any) => {
        quickplans.forEach((quickplan: any) => { 
          /* console.log(quickplan); */
          if (quickplan?.Fecha_Incio && quickplan?.Titulo) {
            const date = new Date(quickplan.Fecha_Incio);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
            if (!this.events[dateKey]) {
              this.events[dateKey] = [];
            }
            this.events[dateKey].push(quickplan.Titulo);
          }
        });
      });

    }
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

  addEventDetails(event: any) {
    if(this.username==''){
      this.dialog.open(InfoModalComponent, {
        data: {
          title: 'Información',
          content: event
        },
        height: '200px',
        width: '300px'
      });
    }
  }

  
}