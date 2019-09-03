import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/walkthrough', pathMatch: 'full' },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  // {path: 'app/user',loadChildren: './ui/user/user.module#UserModule'},
  // { path: 'legal-documentation', loadChildren: './ui/pages/legal/legal.module#LegalPageModule' },
  // { path: 'getting-started', loadChildren: './ui/pages/getting-started/getting-started.module#GettingStartedPageModule' },
  { path: 'walkthrough', loadChildren: './walkthrough/walkthrough.page.module#WalkthroughPageModule' },
  // {path: 'coming-soon',loadChildren: './ui/pages/coming-soon/coming-soon.module#ComingSoonPageModule'},
  { path: 'auth/login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'page-not-found', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' }, { path: '**', redirectTo: 'page-not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
