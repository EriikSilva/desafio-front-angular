import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit{

  nivel_acesso:any;
  slected_nivel_acesso:any;

  @Input() userDialog: boolean = false;

  @Output() dialogClosed = new EventEmitter<void>();
  @Input() saveMode: boolean = false;
  @Input() editMode: boolean = false;

  
  userFormDialog = new FormGroup({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nivel_acesso: new FormControl('', Validators.required)
  })
  
  ngOnInit(): void {
      this.nivel_acesso = [
        { 
          id:1,
          nivel_acesso: "ADMIN"
        },
        {
          id:2,
          nivel_acesso: "USUARIO"
        }
      ]
  }

  closeDialog() {
    this.userDialog = false;
    this.dialogClosed.emit();
  }

  saveUser(){

  }

  onDropdownChangeUser(event:any){
    const { nivel_acesso } = event
  }

  editUserDialog(user:any){
    const { nome, sobrenome, email, nivel_acesso , id} = user;

    this.userFormDialog.get('nome')?.setValue(nome);
    this.userFormDialog.get('sobrenome')?.setValue(sobrenome);
    this.userFormDialog.get('email')?.setValue(email);
    
    const a = this.nivel_acesso.find((item:any) => item.nivel_acesso == nivel_acesso)
    this.slected_nivel_acesso = a

  }

  resetForm(){
    this.userFormDialog.reset();
    this.slected_nivel_acesso = ""
  }
  
}
