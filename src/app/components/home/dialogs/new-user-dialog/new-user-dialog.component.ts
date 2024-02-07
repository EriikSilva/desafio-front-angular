import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../crud-service.service';
import { MessageService } from 'primeng/api';
import { PostUserDTO, PutUserDTO } from '../../DTO/crudDTO';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
  providers:[MessageService]
})
export class NewUserDialogComponent implements OnInit{

  constructor(private crudService:CrudService, private messageService:MessageService, private loginService:LoginService){}

  nivel_acesso?:any;
  slected_nivel_acesso:any;
  idUsuario: any;
  onNvlAccess:any;
  usuarioLogado:any;
  

  @Input() userDialog: boolean = false;

  @Output() dialogClosed = new EventEmitter<void>();
  @Output() getUsuarios = new EventEmitter<void>();
  @Input() saveMode: boolean = false;
  @Input() editMode: boolean = false;

  
  userFormDialog = new FormGroup({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nivel_acesso: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
  })
  
  ngOnInit(): void {
      this.getProps();

      this.nivel_acesso = [
        { 
          id:1,
          nvl_acesso: "Admin"
        },
        {
          id:2,
          nvl_acesso: "Usuario"
        }
      ]
  }

  closeDialog() {
    this.userDialog = false;
    this.dialogClosed.emit();
  }

  saveUser(){
    const formValue = this.userFormDialog.value;
    const nome = String(formValue.nome);
    const sobrenome = String(formValue.sobrenome);
    const email = String(formValue.email);
    const senha = String(formValue.senha)
    const a = Object(formValue.nivel_acesso)
    const { nvl_acesso } = a
    
    const body:PostUserDTO = {
      nome, 
      sobrenome,
      email,
      senha,
      nivel_Acesso: nvl_acesso
    }

    this.crudService.postUsuarios(body)
    .subscribe({
      next:(res:any) => {
        const { mensagem } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: mensagem
        });

        this.getUsuarios.emit();
        this.userFormDialog.reset();
        this.closeDialog()
      }, error:(res:any) => {
        console.log(res)
      }
    })
    
  }

  editUser(){
    const nomeUsuario = this.loginService.getNome();
    const idUsuario = this.loginService.getId();

    const formValue = this.userFormDialog.value;
    const nome = String(formValue.nome);
    const sobrenome = String(formValue.sobrenome);
    const email = String(formValue.email);
    const senha = String(formValue.senha)
    const a = Object(formValue.nivel_acesso)
    const { nvl_acesso } = a
    const id = this.idUsuario;

    const validation = nvl_acesso == undefined ? "Usuario" : nvl_acesso;
    
    const body:PutUserDTO = {
      id,
      nome, 
      sobrenome,
      email,
      senha,
      nivel_Acesso: validation
    }
    
    this.crudService.editUsuarios(body)
    .subscribe({
      next:(res:any) => {

        if(id == idUsuario){
          this.loginService.setNivelAcesso(validation)
        }

        if(nome !== nomeUsuario){
          this.loginService.setNome(nome);
        }

        const { mensagem } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao Editar',
          detail: mensagem
        });

        this.getUsuarios.emit();
        this.userFormDialog.reset();
        this.closeDialog()

        if(id == idUsuario){
          location.reload();
        }
      }, error:(res:any) => {
        console.log(res)
      }
    })
  }

  onDropdownChangeUser(event:any){
    const { nivel_acesso } = event
  }

  editUserDialog(user:any){
    const { nome, sobrenome, email, nivel_Acesso , senha , id} = user;


    this.idUsuario = id
    this.userFormDialog.get('nome')?.setValue(nome);
    this.userFormDialog.get('sobrenome')?.setValue(sobrenome);
    this.userFormDialog.get('email')?.setValue(email);
    
    const a = this.nivel_acesso.find((item:any) => item.nvl_acesso == nivel_Acesso)
    this.slected_nivel_acesso = a

    this.userFormDialog.get('senha')?.setValue(senha);
     
   
  }

  getProps(){
    this.onNvlAccess = localStorage.getItem("NivelAcesso");

    const idUsuario = localStorage.getItem("idUser");
    const nvlAcesso = localStorage.getItem("NivelAcesso");


    if(nvlAcesso == "Admin"){
      this.usuarioLogado = true;
    }       
  }

  resetForm(){
    this.userFormDialog.reset();
    this.slected_nivel_acesso = ""
  }
}
