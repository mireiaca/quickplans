import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommunityComponent } from './components/community/community.component';
import { IndexComponent } from './components/index/index.component';
import { QuickplanComponent } from './components/quickplan/quickplan.component';
import { AddQuickplanComponent } from './components/add-quickplan/add-quickplan.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserHelpComponent } from './components/user-help/user-help.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CommunityComponent,
    IndexComponent,
    QuickplanComponent,
    AddQuickplanComponent,
    ChatComponent,
    UserHelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
