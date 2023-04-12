import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  name: any = "";

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get("name") != undefined) this.name = this.route.snapshot.queryParamMap.get("name");
  }

  redirectToTeacher(Id: number): void {
    this.router.navigateByUrl("/teachers/" + Id);
  }
}
