import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  searchTeacher(): void {
    location.replace("teachers/?name=" + this.searchText);
  }


}
