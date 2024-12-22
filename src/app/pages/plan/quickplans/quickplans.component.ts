import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quickplan, QuickplanService } from '../../../services/quickplans/quickplan.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-quickplans',
  templateUrl: './quickplans.component.html',
  styleUrl: './quickplans.component.scss'
})
export class QuickplansComponent implements OnInit {
  public quickplansAnonimos: Quickplan[] = [];
  public quickplansAdded: Quickplan[] = [];
  public quickplansPending: Quickplan[] = [];
  public environment = environment;
  public type: string = '';

  constructor(
    private route: ActivatedRoute,
    private quickplanService: QuickplanService,
    private router: Router
  ) { }

  reloadQuickplans() {
    this.quickplanService.getQuickplansAnomimos().subscribe((quickplans: Quickplan[]) => {
      this.quickplansAnonimos = quickplans;
    });
  }

  searchFilter(): void {
    const currentDate = new Date();
    const searchElement = document.getElementById('search') as HTMLInputElement;
    const search = searchElement ? searchElement.value.toLowerCase() : '';
    this.quickplansAnonimos = this.quickplansAnonimos
    .filter((quickplan: Quickplan) => quickplan.Titulo.toLocaleLowerCase().includes(search))
    .filter((quickplan: Quickplan) => new Date(quickplan.Fecha_Incio) > currentDate);;
  }

  filterLocation(): void {
    const currentDate = new Date();
    const searchElement = document.getElementById('location') as HTMLInputElement;
    const search = searchElement ? searchElement.value.toLowerCase() : '';
    this.quickplansAnonimos = this.quickplansAnonimos
      .filter((quickplan: Quickplan) => quickplan.field_location.toLocaleLowerCase().includes(search))
      .filter((quickplan: Quickplan) => new Date(quickplan.Fecha_Incio) > currentDate);
  }

  verPlan(plan: string): void {
    this.router.navigate([`/quickplan/${plan}`]);
  }

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    type ? this.type = type : this.type = '';
    /* console.log(type); */

    /* this.quickplanService.getQuickplansAnomimos().subscribe((quickplans: Quickplan[]) => {
      this.quickplansAnonimos = quickplans;
    }); */

    // Obtener info dependiendo del type
    if(type == 'anonimos') {
      this.quickplanService.getQuickplansAnomimos().subscribe((quickplans: Quickplan[]) => {
        const currentDate = new Date();
        this.quickplansAnonimos = quickplans.filter((quickplan: Quickplan) => {
          return new Date(quickplan.Fecha_Incio) > currentDate;
        });
      });
    } else if(type == 'piensatelo') {
      this.quickplanService.getQuickplansAsociados().subscribe(plans => {
        const currentDate = new Date();
        this.quickplansPending = plans.filter((quickplan: Quickplan) => {
          return new Date(quickplan.Fecha_Incio) > currentDate;
        });
      });
    } else if(type == 'mis-planes') {
      this.quickplanService.getQuickplansAgregados().subscribe((quickplans: Quickplan[]) => {
        const currentDate = new Date();
        this.quickplansAdded = quickplans.filter((quickplan: Quickplan) => {
          return new Date(quickplan.Fecha_Incio) > currentDate;
        });
      });
    }

    
  }

}
