import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Connector} from "../restapi";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login:boolean = false;
  darkTheme:string = "dark";
  onDarkTheme:boolean = true;

  constructor(private http: HttpClient, private connector: Connector, public cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get("theme") == "false") {
      document.documentElement.classList.remove(this.darkTheme);
    }
  }
  switched_theme():void{
    if (this.onDarkTheme){
      document.documentElement.classList.remove(this.darkTheme);
      this.onDarkTheme = false
      this.cookieService.set("theme",String(this.onDarkTheme))
    }
    else {
      document.documentElement.classList.add(this.darkTheme);
      this.onDarkTheme = true
      this.cookieService.set("theme",String(this.onDarkTheme))

    }
  }

}
