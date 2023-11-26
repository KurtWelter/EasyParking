import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  forma!:FormGroup;
  mensaje:string = '';
  men:string='';
  constructor(private router: Router, private fb:FormBuilder, private api: DjangoService) {
    this.crearFormulario()
  }

  ngOnInit() {}

  get nombreNoValido(){
    return this.forma.get('nombre_usuario')?.invalid && this.forma.get('nombre_usuario')?.touched;
  }

  get correoNoValido(){
    return this.forma.get('correo_usuario')?.invalid && this.forma.get('correo_usuario')?.touched;
  }

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2NoValido(){
    return this.forma.get('pass2')?.invalid && this.forma.get('pass2')?.touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre_usuario:['',[Validators.required, Validators.minLength(2)]],
      correo_usuario:['',[Validators.required, Validators.email]],
      pass1:['',[Validators.required]],
      pass2:['',[Validators.required]]
    },
    {
      validators:this.Match('pass1', 'pass2'),
    });
  }

  Match(pass1Name:string, pass2Name:string){
    return (formGroup: FormGroup) =>{
      const control = formGroup.controls[pass1Name];
      const matchControl = formGroup.controls[pass2Name];
      if(matchControl.errors && matchControl.errors['Match']){
        return;
      }
      if(control.value != matchControl.value){
        matchControl.setErrors({Match:true});
      }
      else {
        matchControl.setErrors(null);
      }
    }
  }

  goToLogin() {
    this.api.postUser(this.forma.value).subscribe(
      (response)=>{
        this.mensaje =response.Mensaje;
        setTimeout(() => {
          this.mensaje='';
        }, 2500);
      },
      (error)=>{
        if(error.status==400){
          this.men=error.error.error;
          setTimeout(() => {
            this.men='';
          }, 2500);
        }else{
          this.men=error.error.error;
          setTimeout(() => {
            this.men='';
          }, 2500);
        }
      }
    );
  }
}
