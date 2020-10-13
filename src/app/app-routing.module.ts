import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ViewUserInfoComponent } from './view-user-info/view-user-info.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AllusersComponent } from './allusers/allusers.component';

const routes: Routes = [
  {path: '', redirectTo: 'log-in', pathMatch: 'full'},
  {path: 'allusers/:name/:auth', component:  AllusersComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'dashboard/:name/:auth', component: DashboardComponent},
  {path: 'administrator/:name/:auth', component: AddToListComponent},
  {path: 'add-user/:name/:auth', component: AddUserComponent},
  {path: 'edit-user/:name/:auth/:id', component:  EditDataComponent},
  {path: 'view-user/:name/:auth/:id', component: ViewUserInfoComponent},
  {path: '404-not-found', component: NotFoundComponent},
  {path:  '**', redirectTo: '404-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
