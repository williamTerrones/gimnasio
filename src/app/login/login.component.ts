import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:Login = new Login();
  public formulario:FormGroup;
  error:boolean = false;
  cargando:boolean = false;
  mensaje:string = '';
  mensajeBoton:string = 'Iniciar sesión';

  constructor(public loginService:LoginService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required],
    });
  }

  async login(){
    console.log(this.formulario)
    if(!this.formulario.valid) return 

    try{

      this.cargando = true;
      this.mensajeBoton = 'Cargando...'
      await this.loginService.login(this.formulario.value.email,this.formulario.value.password);

    } catch(error){

      this.error = true;
      this.mensaje = error.message;

    }

    this.mensajeBoton = 'Iniciar sesión'


    
    this.loginService.login(this.formulario.value.email,this.formulario.value.password).then(resp => {
      console.log("Resp ", resp)
    }).catch(error => {
      console.log("Error ",error)
      this.error = true;
      this.mensaje = error.message;
    })
  }

}
