import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommunityComponent } from './pages/community/community.component';
import { IndexComponent } from './pages/index/index.component';
import { QuickplanComponent } from './pages/quickplan/quickplan.component';
import { AddQuickplanComponent } from './pages/add-quickplan/add-quickplan.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserHelpComponent } from './pages/user-help/user-help.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsCarouselComponent } from './components/cards-carousel/cards-carousel.component';

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
    UserHelpComponent,
    FooterComponent,
    HeaderComponent,
    CardsCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
