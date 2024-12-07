import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickplanService } from '../../../services/quickplans/quickplan.service';
import { formatDate } from '@angular/common';
import { GroupService, Group } from '../../../services/group/group.service';
import { MatDialog } from '@angular/material/dialog';
import { MapViewDialogComponent } from '../../../components/map-view-dialog/map-view-dialog.component';

@Component({
  selector: 'app-quickplan',
  templateUrl: './quickplan.component.html',
  styleUrl: './quickplan.component.scss'
})
export class QuickplanComponent implements OnInit {
  public quickplan!: any;
  public type = this.route.snapshot.paramMap.get('type') || '';
  public intereses: string[] = [];
  public formattedFechaInicio: string = '';
  public formattedFechaFin: string = '';
  public group: string = '';
  public agregados: string[] = [];
  public asociados: string[] = [];
  public isParticipating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private quickplanService: QuickplanService,
    private cdr: ChangeDetectorRef,
    private groupService: GroupService,
    private dialog: MatDialog
  ){}

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapViewDialogComponent, {
      data: {
      title: 'Ver ubicación',
      center: { 
        lat: parseFloat(this.quickplan?.field_latitud[0].value), 
        lng: parseFloat(this.quickplan?.field_longitud[0].value) 
      }, 
      },
      width: '600px', 
      height: '500px',
      
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Ubicación seleccionada:', result);
      }
    });
  }

  getType(): string {
    let result = '';
    this.quickplanService.getAllTypesPlans().subscribe((types: { uuid: string, nombre: string, tid: string }[]) => {
      types.forEach((type) => {
        if (type.tid == this.quickplan?.field_tipo_de_plan[0].target_id) {
          if (type) {
            this.type = type.nombre.trim();
            console.log(this.type);
            this.cdr.detectChanges(); 
          }
        }
      });
    });
    return result;
  }

  getGroup(): void {
    this.groupService.getMappedGroupInfo(this.quickplan?.field_grupo_asociado[0].target_id).subscribe((group: Group) => {
      console.log(this.quickplan?.field_grupo_asociado[0].target_id);
      console.log(group);
      if (group) {
        this.group = group.Titulo;
        console.log(this.group);
        this.cdr.detectChanges(); 
      }
    });
  }

  getIntereses(): void {
    this.quickplanService.getAllInterests().subscribe((intereses: { uuid: string, nombre: string, tid: string }[]) => {
      this.intereses = []; 
      intereses.forEach((interes) => {
        for (let i = 0; i < 3; i++) {
          if (interes.tid == this.quickplan?.field_tipo_de_actividad[i]?.target_id) {
            this.intereses.push(interes.nombre);
          }
        }
      });
      this.cdr.detectChanges();
      console.log(this.intereses);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.quickplanService.getQuickplan(id).subscribe((quickplan: any) => {
      this.quickplan = quickplan;
      console.log(this.quickplan);
      this.type = this.getType();

      // Comprobar tipo de plan - comprobar si el usuario es participante - obtener intereses/grupos/asociados
      if(this.quickplan?.field_tipo_de_plan[0].target_id == 1){
        const username = localStorage.getItem('username') || '';
        this.agregados = this.quickplan.field_agregados.map((agregado: { value: string }) => agregado.value.trim());
        this.agregados.includes(username) ? this.isParticipating = true : this.isParticipating = false;
        this.agregados = this.agregados.filter((agregado: string) => agregado !== username);
        this.getIntereses();
      } else if(this.quickplan?.field_tipo_de_plan[0].target_id == 2) {
        const username = localStorage.getItem('username') || '';
        this.agregados = this.quickplan.field_agregados.map((agregado: { value: string }) => agregado.value.trim());
        this.agregados.includes(username) ? this.isParticipating = true : this.isParticipating = false;
        this.agregados = this.agregados.filter((agregado: string) => agregado !== username);
        this.getGroup();
      } else if(this.quickplan?.field_tipo_de_plan[0].target_id == 3) {
        if (this.quickplan.field_agregados.length > 0) {
          this.agregados = this.quickplan.field_agregados.map((agregado: { value: string }) => agregado.value.trim());
        
          if (this.agregados.length > 0) {
            const username = localStorage.getItem('username') || '';
            this.agregados.includes(username) ? this.isParticipating = true : this.isParticipating = false;
            this.agregados = this.agregados.filter((agregado: string) => agregado !== username);
        
            if (this.agregados.length === 0 && this.quickplan.field_asociados) {
              this.asociados = this.quickplan.field_asociados.map((asociado: { value: string }) => asociado.value.trim());
              this.asociados = this.asociados.filter((asociado: string) => asociado !== username);
            }
          }
        } else if (this.quickplan.field_asociados.length > 0) {
          const username = localStorage.getItem('username') || '';
          this.asociados = this.quickplan.field_asociados.map((asociado: { value: string }) => asociado.value.trim());
          this.asociados = this.asociados.filter((asociado: string) => asociado !== username);
        }
        console.log('Agregados:', this.agregados);
        console.log('Asociados:', this.asociados);
        
      }
    
      if(this.quickplan.field_fecha_inicio[0].value && this.quickplan.field_fecha_fin[0].value) {
        this.formattedFechaInicio = formatDate(this.quickplan.field_fecha_inicio[0].value, 'yyyy-MM-ddTHH:mm', 'en-US');
        this.formattedFechaFin = formatDate(this.quickplan.field_fecha_fin[0].value, 'yyyy-MM-ddTHH:mm', 'en-US');
      }
      console.log(this.quickplan);
    });


  }

}
