import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NewUserDialogComponent } from './dialogs/new-user-dialog/new-user-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudService } from './crud-service.service';


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

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private crudService:CrudService) {}

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

    this.getUsuarios();
  }

  getUsuarios(){
    this.crudService.getUsuarios()
    .subscribe({
      next: (res:any) => {
        const { dados } = res
        this.users = dados;
      }
    })
  }

  deleteUsuarios(id:any){
    this.crudService.deleteUsuarios(id)
    .subscribe({
      next:(res:any) => {
        const { mensagem } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao Remover',
          detail: mensagem
        }); 
      this.getUsuarios();
      }, error:(res:any) =>{
        console.log('res', res)
      }
    })
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

  openDeletePopup(event:any, usuario:any){
    const { id } = usuario
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja Deletar Este Usuário?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel:"NÃO",
      acceptLabel:"SIM",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
     
        this.deleteUsuarios(id);
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
