import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  doLogin(body:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/Usuario/login`, body)
  }


  setNome(nome:string){
    return localStorage.setItem("Nome", nome)
  }

  getNome(){
    return localStorage.getItem("Nome");
  }

  removeNome(){
    return localStorage.removeItem("Nome")
  }

  setNivelAcesso(nivel_Acesso:string){
    return localStorage.setItem("NivelAcesso", nivel_Acesso)
  }

  getNivelAcesso(){
    return localStorage.getItem("NivelAcesso");
  }

  removeNivelAcesso(){
    return localStorage.removeItem("NivelAcesso");
  }


  setId(id:string){
    return localStorage.setItem("idUser", id)
  }

  removeId(){
    return localStorage.removeItem("idUser")
  }

  getId(){
    return localStorage.getItem("idUser")
  }

}
