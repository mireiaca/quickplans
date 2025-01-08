import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { AddQuickplanComponent } from './pages/plan/add-quickplan/add-quickplan.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CommunityComponent } from './pages/community/community.component';
import { GroupComponent } from './pages/groups/group/group.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { QuickplanComponent } from './pages/plan/quickplan/quickplan.component';
import { QuickplansComponent } from './pages/plan/quickplans/quickplans.component';
import { RecoverComponent } from './pages/user/recover-password/recover.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { UserHelpComponent } from './pages/user/user-help/user-help.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { EditGroupComponent } from './pages/groups/edit-group/edit-group.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { BasicPagesComponent } from './pages/basic-pages/basic-pages.component';
import { ChatBotComponent } from './pages/chat-bot/chat-bot.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Rutas publicas
  { path: '', component: IndexComponent }, // Default route (homepage)
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'recover-password', component: RecoverComponent }, // Recover password page
  { path: 'index', component: IndexComponent }, // Index page
  { path: 'policy-cookies', component: BasicPagesComponent }, // Policy page
  { path: 'policy-privacy', component: BasicPagesComponent }, // Policy page
  { path: 'legal-notice', component: BasicPagesComponent }, // Legal notice page
  { path: 'information', component: BasicPagesComponent }, // Information page
  { path: 'faq', component: BasicPagesComponent }, // FAQ page
  { path: 'form-contact', component: BasicPagesComponent }, // Form-contact page

  // Rutas privadas - autenticadas
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Profile page (post-login)
  { path: 'add-quickplan/:type', component: AddQuickplanComponent, canActivate: [AuthGuard] }, // Add QuickPlan page
  { path: 'chats', component: ChatComponent, canActivate: [AuthGuard] }, // Chat page
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] }, // Community page
  { path: 'group', component: GroupComponent, canActivate: [AuthGuard] }, // Group page
  { path: 'quickplan/:id', component: QuickplanComponent, canActivate: [AuthGuard] }, // QuickPlan page
  { path: 'quickplan/:id', component: QuickplanComponent, canActivate: [AuthGuard] }, // QuickPlan page
  { path: 'quickplan', component: QuickplanComponent, canActivate: [AuthGuard] }, // QuickPlan page
  { path: 'quickplans', component: QuickplansComponent, canActivate: [AuthGuard] }, // QuickPlan page - Anónimos
  /* { path: 'quickplans/:asociado', component: QuickplansComponent }, // QuickPlan page - Aceptado
  { path: 'quickplans/:añadido', component: QuickplansComponent }, // QuickPlan page - Sin aceptar */
  { path: 'quickplans/:type', component: QuickplansComponent, canActivate: [AuthGuard] }, // QuickPlan page - Tipos
  { path: 'user-help', component: UserHelpComponent, canActivate: [AuthGuard] }, // User Help page
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }, // Edit Profile page
  { path: 'edit-group/:id', component: EditGroupComponent, canActivate: [AuthGuard] }, // Edit Group page
  { path: 'group/:id', component: GroupComponent, canActivate: [AuthGuard] }, // Group page
  { path: 'user-profile/:username', component: UserProfileComponent, canActivate: [AuthGuard] }, // User Profile page
  { path: 'chat-bot', component: ChatBotComponent, canActivate: [AuthGuard] }, // Chat Bot page

  // Fallback route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown paths to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
