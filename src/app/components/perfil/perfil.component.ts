import { LoginService } from 'src/app/components/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  constructor(private loginService:LoginService){}

  nomeUser:any;
  nvlAcesso:any;

  ngOnInit(): void {
    this.getProps();
  }


  getProps(){
    this.nomeUser = this.loginService.getNome();
    this.nvlAcesso = this.loginService.getNivelAcesso();
  }
}
