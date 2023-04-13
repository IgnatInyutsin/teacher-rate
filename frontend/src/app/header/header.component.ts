import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
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

  signUp = {
    errors: {
      notDuplicatePassword: false,
      shortPassword: false,
      emptyPassword: false,
      emptyUsername: false,
      incorrectEmail: false,
      placedNickname: false,
    },
    fields: {
      username: "",
      password: "",
      retypePassword: "",
      email: ""
    }
  }


  constructor(private http: HttpClient, private connector: Connector, public cookieService: CookieService) { }

  ngOnInit(): void {
    // проверка авторизации
    if (this.cookieService.get("token") == '') {
      this.login = false;
    }
    else {
      // проверка на существование токена
      this.http.get(this.connector.url + "api/auth/users/me/", {
        headers: new HttpHeaders({
          "Authorization": "Token " + this.cookieService.get("token")
        })
      }).subscribe(() => {}, () => {
        //если не существует - разлогиниваемся
        this.cookieService.delete("token");
        location.reload();
      });
      this.login = true;
    }

    // проверка темной темы
    if (this.cookieService.get("theme") == "false") {
      document.documentElement.classList.remove(this.darkTheme);
    }
  }

  authorization(): void {
    this.cleanLoginErrors();
    if (!this.validateLoginForm()) return;

    this.http.post(this.connector.url + "api/auth/token/login/", this.signIn.fields).
    subscribe((data: any) => {
      this.cookieService.set("token", data.auth_token);
      location.reload();
    }, (error) => {
      console.log("Hello!")
      this.signIn.errors.invalidLoginData = true;
      this.cleanLoginFields();
    });
  }

  registration(): void {
    this.cleanRegistrationErrors();
    if (!this.validateRegistrationForm()) return;

    // запрос на создание пользователя
    this.http.post(this.connector.url + "api/auth/users/", {
      username: this.signUp.fields.username,
      password: this.signUp.fields.password,
      email: this.signUp.fields.email
    }).subscribe((data: any) => {
      //сразу авторизируем
      this.http.post(this.connector.url + "api/auth/token/login/", {
        username: this.signUp.fields.username,
        password: this.signUp.fields.password
      }).subscribe((data: any) => {
        this.cookieService.set("token", data.auth_token);
        location.reload();
      },);
    }, (error: any) => {
      if (error.error.username != undefined) this.signUp.errors.placedNickname = true;
      if (error.error.password != undefined) this.signUp.errors.shortPassword = true;
    })
  }

  signOut(): void {
    this.cookieService.delete("token", "/");
    this.cookieService.delete("token", "/teachers");
    location.reload();
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

  cleanLoginErrors() : void {
    this.signIn.errors.emptyPassword = false;
    this.signIn.errors.emptyUsername = false;
  }

  validateLoginForm() : boolean {
    if (this.signIn.fields.password == "") {
      this.signIn.errors.emptyPassword = true;
      return false;
    }
    if (this.signIn.fields.username == "") {
      this.signIn.errors.emptyUsername = true;
      return false;
    }
    return true;
  }

  cleanLoginFields(): void {
    this.signIn.fields.password = "";
    this.signIn.fields.username = "";
  }

  cleanRegistrationErrors(): void {
    this.signUp.errors.notDuplicatePassword = false
    this.signUp.errors.shortPassword = false
    this.signUp.errors.emptyPassword = false
    this.signUp.errors.emptyUsername = false
    this.signUp.errors.incorrectEmail = false
    this.signUp.errors.placedNickname = false
  }
  validateRegistrationForm(): boolean {
    if (!this.validateEmail(this.signUp.fields.email)) {
      this.signUp.errors.incorrectEmail = true;
      this.signUp.fields.email = ""
      return false;
    }
    if (this.signUp.fields.password != this.signUp.fields.retypePassword) {
      this.signUp.errors.notDuplicatePassword = true;
      return false;
    }
    if (this.signUp.fields.password == "") {
      this.signUp.errors.emptyPassword = true;
      return false;
    }
    if (this.signUp.fields.username == "") {
      this.signUp.errors.emptyUsername = true;
      return false;
    }
    if (this.signUp.fields.password.length < 8) {
      this.signUp.errors.shortPassword = true;
      this.signUp.fields.password = ""
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
}
