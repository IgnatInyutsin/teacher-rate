import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Connector} from "../restapi";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  id: any = -1;

  commentary = {
    fields: {
      title: "",
      main_text: "",
      grade: ""
    },
    hidden: true
  }

  constructor(private route: ActivatedRoute, public cookieService: CookieService, private http: HttpClient, private connector: Connector,) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('Id');
    console.log(this.id);

    if (this.cookieService.get("token") != "") {
      this.commentary.hidden = false;
    }
  }

  putReview(): void {
    this.http.post(this.connector.url + "api/reviews/", {
      grade: Number(this.commentary.fields.grade),
      main_text: this.commentary.fields.main_text,
      title: this.commentary.fields.title,
      teacher: this.id
    }, {headers: new HttpHeaders({"Authorization": "Token " + this.cookieService.get("token")})}).subscribe((data) => {
      console.log(data);
      this.commentary.fields.title = "";
      this.commentary.fields.grade = "0";
      this.commentary.fields.main_text = "";
    });
  }
}
