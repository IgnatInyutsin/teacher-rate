import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Connector} from "../restapi";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login:boolean = false;
  darkTheme:string = "dark";
  onDarkTheme:boolean = true;
  signIn = {
    errors: {
      emptyPassword: false,
      emptyUsername: false,
      invalidLoginData: false,
    },
    fields: {
      username: "",
      password: ""
    }
  }


  constructor(private http: HttpClient, private connector: Connector, public cookieService: CookieService) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.cleanRegistrationErrors();
    this.validateRegistrationForm();

    this.http.post(this.connector.url + "api/auth/token/login/", this.signIn.fields).
    subscribe((data: any) => {
      this.cookieService.set("token", data.auth_token);
      location.reload();
    }, (error) => {
      console.log("Hello!")
      this.signIn.errors.invalidLoginData = true;
    });
  }

  switched_theme():void{
    if (this.onDarkTheme){
      document.documentElement.classList.remove(this.darkTheme);
      this.onDarkTheme = false
    }
    else {
      document.documentElement.classList.add(this.darkTheme);
      this.onDarkTheme = true
    }
  }

  cleanRegistrationErrors() : void {
    this.signIn.errors.emptyPassword = false;
    this.signIn.errors.emptyUsername = false;
  }

  validateRegistrationForm() : void {
    if (this.signIn.fields.password == "") {
      this.signIn.errors.emptyPassword = true;
    }
    if (this.signIn.fields.username == "") {
      this.signIn.errors.emptyUsername = true;
    }
  }
}
