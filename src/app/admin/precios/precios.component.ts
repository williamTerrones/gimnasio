import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Precio } from 'src/app/models/precio';

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

  constructor(private modalService:BsModalService) {
    this.tipos_duracion.push({id:1,nombre:"Día(s)"})
    this.tipos_duracion.push({id:2,nombre:"Semana(s)"})
    this.tipos_duracion.push({id:3,nombre:"Quincena(s)"})
    this.tipos_duracion.push({id:4,nombre:"Mes(s)"})
    this.tipos_duracion.push({id:5,nombre:"Año(s)"})
   }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit(): void {
  }

}
