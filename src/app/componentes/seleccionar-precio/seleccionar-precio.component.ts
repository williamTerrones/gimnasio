import { Component, OnInit } from '@angular/core';
import { PrecioService } from 'src/app/services/precio.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-seleccionar-precio',
  templateUrl: './seleccionar-precio.component.html',
  styleUrls: ['./seleccionar-precio.component.scss']
})
export class SeleccionarPrecioComponent implements OnInit {

  precioSeleccionado:string = null;

  constructor(public precioService:PrecioService) {
    this.precioService.getPrecios();
   }

  ngOnInit(): void {
  }

}
