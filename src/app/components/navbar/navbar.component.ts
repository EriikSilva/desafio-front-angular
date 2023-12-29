import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

  constructor( private router:Router){}

  items: MenuItem[] = [];

  ngOnInit(): void {

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

  logout(){
    this.router.navigate(['/'])
  }


}
