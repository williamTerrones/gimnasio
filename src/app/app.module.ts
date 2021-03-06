import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SkeletonComponent } from './componentes/skeleton/skeleton.component';
import { SeleccionarClienteComponent } from './componentes/seleccionar-cliente/seleccionar-cliente.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { ClienteComponent } from './admin/cliente/cliente.component';
import { PreciosComponent } from './admin/precios/precios.component';

import { SeleccionarPrecioComponent } from './componentes/seleccionar-precio/seleccionar-precio.component';
import { InscripcionesComponent } from './admin/inscripciones/inscripciones.component';

import { InscripcionComponent } from './admin/inscripcion/inscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CargandoComponent,
    MenuComponent,
    ClientesComponent,
    ClienteComponent,
    PreciosComponent,
    SkeletonComponent,
    InscripcionesComponent,
    SeleccionarClienteComponent,
    InscripcionComponent,
    SeleccionarPrecioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
