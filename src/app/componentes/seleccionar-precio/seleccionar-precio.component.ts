import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrecioService } from 'src/app/services/precio.service';

@Component({
  selector: 'app-seleccionar-precio',
  templateUrl: './seleccionar-precio.component.html',
  styleUrls: ['./seleccionar-precio.component.scss']
})
export class SeleccionarPrecioComponent implements OnInit {

  precioSeleccionado:string = null;
  @Output("seleccionoPrecio") seleccionoPrecio = new EventEmitter();

  constructor(public precioService:PrecioService) {
    this.precioService.getPrecios();
   }

   seleccionarPrecio(){
    this.seleccionoPrecio.emit(this.precioSeleccionado)
  }

  ngOnInit(): void {
  }

}
