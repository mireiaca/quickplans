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

const routes: Routes = [
  // Rutas publicas
  { path: '', component: IndexComponent }, // Default route (homepage)
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'recover-password', component: RecoverComponent }, // Recover password page
  { path: 'index', component: IndexComponent }, // Index page

  // Rutas privadas - autenticadas
  { path: 'profile', component: ProfileComponent }, // Profile page (post-login)
  { path: 'add-quickplan/:type', component: AddQuickplanComponent }, // Add QuickPlan page
  { path: 'chat', component: ChatComponent }, // Chat page
  { path: 'community', component: CommunityComponent }, // Community page
  { path: 'group', component: GroupComponent }, // Group page
  { path: 'quickplan/:id', component: QuickplanComponent }, // QuickPlan page
  { path: 'quickplan/:id', component: QuickplanComponent }, // QuickPlan page
  { path: 'quickplan', component: QuickplanComponent }, // QuickPlan page
  { path: 'quickplans', component: QuickplansComponent }, // QuickPlan page - Anónimos
  /* { path: 'quickplans/:asociado', component: QuickplansComponent }, // QuickPlan page - Aceptado
  { path: 'quickplans/:añadido', component: QuickplansComponent }, // QuickPlan page - Sin aceptar */
  { path: 'quickplans/:type', component: QuickplansComponent }, // QuickPlan page - Tipos
  { path: 'user-help', component: UserHelpComponent }, // User Help page
  { path: 'edit-profile', component: EditProfileComponent }, // Edit Profile page
  { path: 'edit-group/:id', component: EditGroupComponent }, // Edit Group page
  { path: 'group/:id', component: GroupComponent }, // Group page
  { path: 'user-profile/:username', component: UserProfileComponent }, // User Profile page

  // Fallback route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown paths to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
