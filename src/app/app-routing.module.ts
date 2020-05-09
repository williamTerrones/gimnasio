import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { ClienteComponent } from './admin/cliente/cliente.component';
//import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'admin',
    children:[
      {
        path:'clientes',
        component:ClientesComponent,
      },
      {
        path:'clientes/:id_cliente',
        component:ClienteComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
