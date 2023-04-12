import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login:boolean = false;
  darkTheme:string = "dark";
  onDarkTheme:boolean = true;

  constructor() { }

  ngOnInit(): void {
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

}
