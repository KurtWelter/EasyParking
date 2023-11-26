import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  forma!:FormGroup;
  mensaje:string='';
  men:string='';
  constructor(private router: Router, private fb: FormBuilder, private api: DjangoService, private authService: AuthService) {
    this.crearFormulario()
  }

  ngOnInit() {}

  get correoNoValido(){
    return this.forma.get('correo_usuario')?.invalid && this.forma.get('correo_usuario')?.touched;
  }

  get pass1NoValido(){
    return this.forma.get('password')?.invalid && this.forma.get('password')?.touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      correo_usuario:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
  }

  goToMain() {
    this.api.autenticarUser(this.forma.value).subscribe(
      (response)=>{
        this.authService.login();
        this.router.navigate(['/main'], {
          state: {nombre: response.nombre_usuario, id: response.id_usuario}
        });
      },
      (error)=>{
        if(error.status === 400){
          this.mensaje = 'Credenciales inválidas';
          setTimeout(() => {
            this.mensaje='';
          }, 5000);
        }
        else if(error.status === 500){
          this.mensaje = 'Error interno del servidor';
          setTimeout(() => {
            this.mensaje='';
          }, 5000);
        } 
      }
    );
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }
  goToOlvidoContrasena() {
    this.router.navigate(['/olvido-contrasena']);
  }
}
