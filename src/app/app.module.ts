import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorModalComponent } from './error-modal/error-modal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
