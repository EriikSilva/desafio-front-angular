import { LoginService } from 'src/app/components/login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desafio-front-indt';

  constructor(private LoginService:LoginService){}

  getId(){
    return this.LoginService.getId();
  }
}
