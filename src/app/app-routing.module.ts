import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { AddQuickplanComponent } from './pages/add-quickplan/add-quickplan.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CommunityComponent } from './pages/community/community.component';
import { GroupComponent } from './pages/group/group.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuickplanComponent } from './pages/quickplan/quickplan.component';
import { RecoverComponent } from './pages/recover-password/recover.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHelpComponent } from './pages/user-help/user-help.component';

const routes: Routes = [
  // Public routes
  { path: '', component: IndexComponent }, // Default route (homepage)
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'recover-password', component: RecoverComponent }, // Recover password page

  // Authenticated routes
  { path: 'profile', component: ProfileComponent }, // Profile page (post-login)
  { path: 'add-quickplan', component: AddQuickplanComponent }, // Add QuickPlan page
  { path: 'chat', component: ChatComponent }, // Chat page
  { path: 'community', component: CommunityComponent }, // Community page
  { path: 'group', component: GroupComponent }, // Group page
  { path: 'quickplan', component: QuickplanComponent }, // QuickPlan page
  { path: 'user-help', component: UserHelpComponent }, // User Help page

  // Fallback route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown paths to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
