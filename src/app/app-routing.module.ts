import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'mainPreview',
    pathMatch: 'full',
  },
  {
    path: 'mainPreview',
    loadChildren: () =>
      import('./pages/mainPreviw/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () =>
      import('./pages/olvido-contrasena/olvido-contrasena.module').then(
        (m) => m.OlvidoContrasenaPageModule
      ),
  },
  {
    path: 'pago/:parkingName', //pago/:parkingName
    loadChildren: () =>
      import('./pages/pago/pago.module').then((m) => m.PagoPageModule),
      canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
