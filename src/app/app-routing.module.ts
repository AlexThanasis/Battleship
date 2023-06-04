import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'protected',
    canActivate: [AuthGuard],
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
