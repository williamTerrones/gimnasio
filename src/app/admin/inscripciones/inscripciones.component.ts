import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripccion';
import { ClienteService } from 'src/app/services/cliente.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {

  public inscripcion:Inscripcion = new Inscripcion;

  constructor(public clienteService:ClienteService) { }

  ngOnInit(): void {
  }

  asignarCliente(idCliente:string){
    
    let cliente = this.clienteService.clientes.find(cliente => cliente.id===idCliente)

    this.inscripcion.cliente = cliente ? cliente.ref : null;
    
  }

}
