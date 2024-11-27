import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../../services/user/user.service';
import { Quickplan, QuickplanService } from '../../services/quickplans/quickplan.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  environment = environment;

  plansAnonimous: Quickplan[] = [];
  friends: User[] = [];
  pendingPlans: Quickplan[] = [];
  userFriends: User[] = [];

  viewUserProfile(username: string): void {
    window.location.href = `/user-profile/${username}`;
  }

  viewQuickplan(id: string): void {
    window.location.href = `/quickplan/${id}`;
  }

  constructor(
    private userService: UserService,
    private quickplanService: QuickplanService
  ) {}

  ngOnInit(): void {
    this.userService.getMyFriends().subscribe((users: User[]) => { 

      this.userFriends = users.map((user: any) => ({ 
        field_nombre: user.username || '',
        Nombre: user.name || '', 
        Username: user.username || '', 
        Imagen: user.image || '', 
        Biografia: '', 
        Intereses: '', 
        Localidad: '', 
        Email: '',
        Amigos: null, 
        uuid: user.uid || ''
      }));
    });

    this.quickplanService.getQuickplansAsociados().subscribe(plans => {
      this.pendingPlans = plans;
    });

    this.quickplanService.getQuickplansAnomimos().subscribe(plans => {
      this.plansAnonimous = plans;
    });


  }

}

