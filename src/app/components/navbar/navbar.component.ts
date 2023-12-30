import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string[];
  command?: () => void;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor( private router:Router, private loginService:LoginService){}

  items: MenuItem[] = [];
  nmUsuario:any;
  nvlAcesso:any;

  ngOnInit(): void {
   this.getNmUsuario();
    this.items = [
      {
        label:'Perfil',
        icon:'pi pi-user',
        routerLink: ['/perfil']
      },
      {
        label:'Sair',
        icon:'pi pi-sign-out',
        command: () => {
          this.logout()
        }
     },
    ]
  }

  getNmUsuario(){
   this.nmUsuario = this.loginService.getNome();
   this.nvlAcesso = this.loginService.getNivelAcesso();
  }

  logout(){
    this.loginService.removeNome();
    this.loginService.removeNivelAcesso();
    this.loginService.removeId();
    this.router.navigate(['/'])
  }


}
