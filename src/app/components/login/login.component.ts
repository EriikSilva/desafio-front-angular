import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {

  constructor(private loginService:LoginService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService){}


  formLogin = new FormGroup({
    email : new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required)
  })

  doLogin(){
    const formValue = this.formLogin.value;

    const email = String(formValue.email);
    const senha = String(formValue.senha);

    console.log('formValue', formValue)

    const body = {
      email,
      senha
    }

    this.loginService.doLogin(body)
    .subscribe({
      next:(res:any) => {
        const { nome , nivel_Acesso} = res.user
        
        this.loginService.setNome(nome);
        this.loginService.setNivelAcesso(nivel_Acesso);

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
