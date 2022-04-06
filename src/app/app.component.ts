import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'f_first_angular_project';

  getName():void{
    console.log("Mi primer proyecto Angular");
  }
}
