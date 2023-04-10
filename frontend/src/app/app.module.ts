import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';

// определение маршрутов
const appRoutes: Routes = [];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
