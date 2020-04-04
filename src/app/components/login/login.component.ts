import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  datosCorrectos:boolean=true;
  textoError;
  constructor(private form:FormBuilder,private auth: AngularFireAuth,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.formLogin=this.form.group({
      email:['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password:['',Validators.required]
    }
    
  }
  login() {
    if(this.formLogin.valid){
      this.datosCorrectos=true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formLogin.value.email,this.formLogin.value.password)
              .then((usuario)=>{
                console.log(usuario);
                this.spinner.hide();
              }).catch((error)=>{
                this.datosCorrectos=false;
                this.textoError=error.message;
                this.spinner.hide();

              })
    }else{
      this.datosCorrectos=false;
      this.textoError="datos incorrectos";
    }
    
  }

}
