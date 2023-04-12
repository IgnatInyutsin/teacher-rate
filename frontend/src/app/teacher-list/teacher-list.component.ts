import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Connector} from "../restapi";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  name: any = "";
  addTeacher = {
    fields: {
      name: "",
      job_place: "",
      city: "",
      study_place: "",
      description: "",
      photo: ""
    },
    error: false,
    success: false
  }
  login = false

  teachers: any = [
      {
        "name": "",
        "city": "",
        "job_place": "",
        "photo": "",
        "grade_mean": ""
      }
      ]


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private connector: Connector, public cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get("name") != undefined) this.name = this.route.snapshot.queryParamMap.get("name");

    // получаем учителей
    this.http.get(this.connector.url + "api/teachers/", {params: {"name": this.name}}).subscribe((data) => {
      this.teachers = data;
      console.log(data);
    });

    if (this.cookieService.get("token") != "") {
      this.login = true;
    } else {
      this.login = false;
    }

  }

  redirectToTeacher(Id: number): void {
    this.router.navigateByUrl("/teachers/" + Id);
  }

  addNewTeacher(): void {
    this.http.post(this.connector.url + "api/teachers/", this.addTeacher.fields, {
      headers: new HttpHeaders({"Authorization": "Token " + this.cookieService.get("token")})}).subscribe(() => {
        this.addTeacher.success = true;
    }, () => {
        this.addTeacher.error = true;
    })
  }
}
