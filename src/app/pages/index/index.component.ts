import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  plans: any[] = [];
  friends: any[] = [];
  pendingPlans: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Simula las peticiones a tus endpoints
    /* this.http.get<any[]>('https://api.example.com/plans').subscribe((data) => {
      this.plans = data;
    });

    this.http.get<any[]>('https://api.example.com/friends').subscribe((data) => {
      this.friends = data;
    });

    this.http.get<any[]>('https://api.example.com/pending-plans').subscribe((data) => {
      this.pendingPlans = data;
    }); */
  }
}
