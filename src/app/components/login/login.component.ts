import { CrudService } from './../home/crud-service.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostUserDTO } from '../home/DTO/crudDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit{

  constructor(
    private loginService:LoginService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private CrudService:CrudService,
    private messageService: MessageService){}

  nivel_acesso?:any;
  slected_nivel_acesso:any;

  ngOnInit(): void {
      this.loginService.removeNome();
      this.loginService.removeNivelAcesso();

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

  formLogin = new FormGroup({
    email : new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required)
  })

  userFormDialog = new FormGroup({
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    nivel_acesso: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  })

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

    this.CrudService.postUsuarios(body)
    .subscribe({
      next:(res:any) => {
        const { mensagem } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: mensagem
        });

        this.userFormDialog.reset();
      }, error:(res:any) => {
        console.log(res)
      }
    })    
  }

  doLogin(){
    const formValue = this.formLogin.value;

    const email = String(formValue.email);
    const senha = String(formValue.senha);
 
    const body = {
      email,
      senha
    }

    this.loginService.doLogin(body)
    .subscribe({
      next:(res:any) => {
        const { nome , nivel_Acesso, id} = res.user
        
        this.loginService.setNome(nome);
        this.loginService.setNivelAcesso(nivel_Acesso);
        this.loginService.setId(id);

        this.router.navigate(['/home']);
      }, error:(res:any) => {        
        const { message } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Logar',
          detail: message
        });
      }
    })
  }

}
