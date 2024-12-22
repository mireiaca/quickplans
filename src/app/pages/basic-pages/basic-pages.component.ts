import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasicPagesService, BasicPage } from '../../services/basic-pages/basic-pages.service';

@Component({
  selector: 'app-basic-pages',
  templateUrl: './basic-pages.component.html',
  styleUrl: './basic-pages.component.scss'
})
export class BasicPagesComponent {

  currentRoute: string = '';
  title: string = '';
  content: string = '';

  constructor(
    private router: Router,
    private basicPagesService: BasicPagesService,
  ) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.loadCurrentPage();
  }

  loadCurrentPage(): void {
    switch (this.currentRoute) {
      case '/policy-cookies':
        this.basicPagesService.getBasicPageInfo('104').subscribe((page: BasicPage) => {
          console.log(page);
          this.title = page.title;
          this.content = page.content;
          const contentContainer = document.getElementById("content-container");
          if (contentContainer) {
            contentContainer.innerHTML = this.content;
          }
        });
        break;
      case '/policy-privacy':
        this.basicPagesService.getBasicPageInfo('103').subscribe((page: BasicPage) => {
          console.log(page);
          this.title = page.title;
          this.content = page.content;
          const contentContainer = document.getElementById("content-container");
          if (contentContainer) {
            contentContainer.innerHTML = this.content;
          }
        });
        break;
      case '/legal-notice':
        this.basicPagesService.getBasicPageInfo('105').subscribe((page: BasicPage) => {
          console.log(page);
          this.title = page.title;
          this.content = page.content;
          const contentContainer = document.getElementById("content-container");
          if (contentContainer) {
            contentContainer.innerHTML = this.content;
          }
        });
        break;
      case '/information':
        this.basicPagesService.getBasicPageInfo('106').subscribe((page: BasicPage) => {
          this.title = page.title;
          this.content = page.content;
          const contentContainer = document.getElementById("content-container");
          if (contentContainer) {
            contentContainer.innerHTML = this.content;
          }
        });
        break;
      default:
        this.router.navigate(['/']);
    }
  }


}
