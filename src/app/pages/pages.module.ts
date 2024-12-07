import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuickplanComponent } from './plan/add-quickplan/add-quickplan.component';
import { ChatComponent } from './chat/chat.component';
import { CommunityComponent } from './community/community.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserHelpComponent } from './user/user-help/user-help.component';
import { RegisterComponent } from './user/register/register.component';
import { RecoverComponent } from './user/recover-password/recover.component';
import { GroupComponent } from './groups/group/group.component';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ComponentsModule } from '../components/components.module';
import { QuickplansComponent } from './plan/quickplans/quickplans.component';
import { QuickplanComponent } from './plan/quickplan/quickplan.component';

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
    GroupComponent,
    EditProfileComponent,
    UserProfileComponent,
    EditGroupComponent,
    QuickplansComponent,
    QuickplanComponent
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
    ComponentsModule
  ]
})
export class PagesModule { }
