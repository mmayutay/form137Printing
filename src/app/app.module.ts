import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ViewUserInfoComponent } from './view-user-info/view-user-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AllusersComponent } from './allusers/allusers.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    AddToListComponent,
    AddUserComponent,
    EditDataComponent,
    ViewUserInfoComponent,
    NotFoundComponent,
    SideNavComponent,
    AllusersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
