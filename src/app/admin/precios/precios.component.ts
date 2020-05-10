import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Precio } from 'src/app/models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  modalRef:BsModalRef
  precio:Precio = new Precio();

  constructor(private modalService:BsModalService) { }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit(): void {
  }

}
