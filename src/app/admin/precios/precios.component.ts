import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Precio } from 'src/app/models/precio';
import { PrecioService } from 'src/app/services/precio.service';
import swal from'sweetalert2';
import { DatosGenerales } from 'src/app/mixins/datosGenerales';

interface DuracionI {
  id:number,
  nombre:string,
}

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})

export class PreciosComponent extends DatosGenerales implements OnInit {
  

  modalRef:BsModalRef
  precio:Precio = new Precio();
  tipos_duracion:Array<DuracionI> = new Array();

  constructor(private modalService:BsModalService, public precioService:PrecioService) {

    super();
    
    this.tipos_duracion.push({id:0,nombre:"Día(s)"})
    this.tipos_duracion.push({id:1,nombre:"Semana(s)"})
    this.tipos_duracion.push({id:2,nombre:"Quincena(s)"})
    this.tipos_duracion.push({id:3,nombre:"Mes(s)"})
    this.tipos_duracion.push({id:4,nombre:"Año(s)"})

    this.precioService.getPrecios();


   }

  nuevoPrecio(template:TemplateRef<any>){
    this.id = null;
    this.precio = new Precio()
    this.modalRef = this.modalService.show(template)
  }

  async guardarPrecio(){

    try{

      this.titulo_boton = "Cargando..."
      this.muestra_cargando = true;
      this.precio.fecha_registro = new Date();

      await this.precioService.addPrecio(this.precio) as string
      this.cerrarModal();

     } catch(error) {
       console.log("Error al guardar precio ",error)
       swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
     }

     this.titulo_boton = "Guardar";
     this.muestra_cargando = false;

  }

  async actualizarPrecio(){
    console.log("Actualizar precio")
  }

  cerrarModal(){
    this.modalRef.hide()
  }

  ngOnInit(): void {
  }

}
