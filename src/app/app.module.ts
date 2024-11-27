import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GroupService } from './services/group/group.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ComponentsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    GroupService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
