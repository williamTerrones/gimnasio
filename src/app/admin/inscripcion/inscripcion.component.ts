import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripccion';
import { ClienteService } from 'src/app/services/cliente.service';
import { PrecioService } from 'src/app/services/precio.service';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base

interface FechaI {
  id:number,
  total:number,
  substract:string,
}

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  public inscripcion:Inscripcion = new Inscripcion;

  public fechas:Array<FechaI> = new Array();

  constructor(public clienteService:ClienteService, public precioService:PrecioService) {
    this.fechas.push({id:0,total:1,substract:"days"})
    this.fechas.push({id:1,total:7,substract:"days"})
    this.fechas.push({id:2,total:15,substract:"days"})
    this.fechas.push({id:3,total:1,substract:"months"})
    this.fechas.push({id:4,total:1,substract:"years"})
    this.inscripcion.fecha_inicial = new Date()
   }

  ngOnInit(): void {
  }

  asignarCliente(idCliente:string){
    
    let cliente = this.clienteService.clientes.find(cliente => cliente.id===idCliente)

    this.inscripcion.cliente = cliente ? cliente.ref : null;
    
  }

  asignarPrecio(idPrecio:string){
    
    let precio = this.precioService.precios.find(precio => precio.id===idPrecio)

    this.inscripcion.precio = precio ? precio.ref : null;
    
    this.calcularFechaFinal();
    
  }

  asignarFechaInicial(fecha:string){
    this.inscripcion.fecha_inicial = fecha!=='' ? new Date(fecha) : null;
  }

  calcularFechaFinal(){
    
    if(this.inscripcion.precio===null || this.inscripcion.fecha_inicial===null){
      this.inscripcion.fecha_final = null;
      return false;
    }

    const precio = this.precioService.precios.find(precio => precio.id===this.inscripcion.precio.id)

    if(precio){
      
      const tiempo = this.fechas.find(fecha => String(fecha.id)===String(precio.tipo_duracion))
      
      if(tiempo){
        const fecha_inicial = moment(this.inscripcion.fecha_inicial, "DD-MM-YYYY")
        const fecha_final = fecha_inicial.add(precio.duracion*tiempo.total,tiempo.substract as Base)
        this.inscripcion.fecha_final = new Date(fecha_final.format("MM/DD/YYYY"));
        return true;
      }

    }

    this.inscripcion.fecha_final = null;

    
  }

  guardarInscripcion(){
    console.log("Inscripcion ", this.inscripcion)
  }

}
