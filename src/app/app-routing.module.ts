import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
