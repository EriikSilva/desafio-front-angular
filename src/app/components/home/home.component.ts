import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NewUserDialogComponent } from './dialogs/new-user-dialog/new-user-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';


interface User {
  id:number;
  nome: string;
  sobrenome: string;
  email: string;
  nivel_acesso: 'ADMIN' | 'USUARIO'; 
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit{

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('newUserDialog') NewUserDialog: NewUserDialogComponent | undefined;

  users: User[] = [];

  userDialog: boolean = false;
  saveMode: boolean = false;
  editMode: boolean = false;
  showLabel: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateLabelVisibility();
  }


  updateLabelVisibility(): void {
    this.showLabel = window.innerWidth > 519;
  }
  
  
  ngOnInit(): void {
    this.updateLabelVisibility();

      this.users = [
        {
          id:1,
          nome:'erik',
          sobrenome: 'felipe',
          email:'erik@teste.com',
          nivel_acesso: "ADMIN"
        },
        {
          id:2,
          nome:'brennon',
          sobrenome: 'junio',
          email:'brennon@teste.com',
          nivel_acesso: "USUARIO"
        },
      ]
  }

  openNewUserDialog(){
    this.NewUserDialog?.resetForm();
    this.saveMode = true;
    this.editMode = false
    this.userDialog = true
  }

  openEditUserDialog(user:any){
    this.editMode = true;
    this.saveMode = false;
    this.userDialog = true;
    this.NewUserDialog?.editUserDialog(user)
  }

  openDeletePopup(event:any){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja Deletar Este Usuário?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel:"NÃO",
      acceptLabel:"SIM",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
      },
      reject: () => {
         
      }
  });
  }
  
  onDialogClosed(){
    this.userDialog = false;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
