import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuickplanComponent } from './add-quickplan/add-quickplan.component';
import { ChatComponent } from './chat/chat.component';
import { CommunityComponent } from './community/community.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHelpComponent } from './user-help/user-help.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover-password/recover.component';
import { GroupComponent } from './group/group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddQuickplanComponent,
    ChatComponent,
    CommunityComponent,
    IndexComponent,
    LoginComponent,
    ProfileComponent,
    UserHelpComponent,
    RegisterComponent,
    RecoverComponent,
    GroupComponent
  ],
  exports: [
    AddQuickplanComponent,
    ChatComponent,
    CommunityComponent,
    IndexComponent,
    LoginComponent,
    ProfileComponent,
    UserHelpComponent,
    RegisterComponent,
    RecoverComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class PagesModule { }
