import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import {Connector} from "./restapi";

// определение маршрутов
const appRoutes: Routes = [
  {path: "teachers/:Id", component: TeacherComponent},
  {path: "teachers", component: TeacherListComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
    TeacherComponent,
    TeacherListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    CookieService,
    Connector
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
