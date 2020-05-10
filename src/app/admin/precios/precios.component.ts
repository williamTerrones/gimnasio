import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Precio } from 'src/app/models/precio';
import { PrecioService } from 'src/app/services/precio.service';

interface DuracionI {
  id:number,
  nombre:string,
}

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})

export class PreciosComponent implements OnInit {

  modalRef:BsModalRef
  precio:Precio = new Precio();
  tipos_duracion:Array<DuracionI> = new Array();

  constructor(private modalService:BsModalService, public precioService:PrecioService) {
    
    this.tipos_duracion.push({id:0,nombre:"Día(s)"})
    this.tipos_duracion.push({id:1,nombre:"Semana(s)"})
    this.tipos_duracion.push({id:2,nombre:"Quincena(s)"})
    this.tipos_duracion.push({id:3,nombre:"Mes(s)"})
    this.tipos_duracion.push({id:4,nombre:"Año(s)"})

    this.precioService.getPrecios();


   }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit(): void {
  }

}
