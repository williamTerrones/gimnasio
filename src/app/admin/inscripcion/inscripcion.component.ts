import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripccion';
import { ClienteService } from 'src/app/services/cliente.service';
import { PrecioService } from 'src/app/services/precio.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  public inscripcion:Inscripcion = new Inscripcion;

  constructor(public clienteService:ClienteService, public precioService:PrecioService) { }

  ngOnInit(): void {
  }

  asignarCliente(idCliente:string){
    
    let cliente = this.clienteService.clientes.find(cliente => cliente.id===idCliente)

    this.inscripcion.cliente = cliente ? cliente.ref : null;
    
  }

  asignarPrecio(idPrecio:string){
    
    let precio = this.precioService.precios.find(precio => precio.id===idPrecio)

    this.inscripcion.precio = precio ? precio.ref : null;
    
  }

  guardarInscripcion(){
    console.log("Inscripcion ", this.inscripcion)
  }

}
