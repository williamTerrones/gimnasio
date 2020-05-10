import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Precio } from 'src/app/models/precio';
import { PrecioService } from 'src/app/services/precio.service';
import swal from'sweetalert2';
import { DatosGenerales } from 'src/app/mixins/datosGenerales';
import { ALERTA_CONFIRMACION } from 'src/app/constants/helpers';

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
    this.texto_boton = "Guardar";
    this.modalRef = this.modalService.show(template)
  }

  async verPrecio(idPrecio:string, template:TemplateRef<any>){
    
    this.id = idPrecio;
    this.cargando_informacion = true;
    this.modalRef = this.modalService.show(template)

    const precio = await this.precioService.getPrecio(this.id)

    if(precio===null){
      await swal.fire('Upps!', "El precio no fué encontrado", 'error');
      this.cerrarModal();
    }
    
    setTimeout(() => {
      this.texto_boton = "Actualizar";
      this.precio = precio as Precio;
      console.log("Precio ", precio)
      this.cargando_informacion = false;
    },500)

  }

  async eliminarPrecio(idPrecio:string){

    try{

      let alerta = ALERTA_CONFIRMACION
      alerta.text ="Al eliminar el precio no se podrá recuperar";
      const result = await swal.fire(alerta)

      if(!result.value) return ;
      
      await this.precioService.deletePrecio(idPrecio)

    } catch(error){
      console.log("Error al eliminar precio ", error)
      swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
    }


  }

  async guardarPrecio(){

    try{

      this.texto_boton = "Cargando..."
      this.muestra_cargando = true;
      this.precio.fecha_registro = new Date();

      await this.precioService.addPrecio(this.precio) as string
      swal.fire('Bien hecho!', "El precio ha sido actualizado correctamente", 'success').then(() => this.cerrarModal())
      

     } catch(error) {
       console.log("Error al guardar precio ",error)
       swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
     }

     this.texto_boton = "Guardar";
     this.muestra_cargando = false;

  }

  async actualizarPrecio(){

    try{
      
      this.texto_boton = "Cargando..."
      this.muestra_cargando = true;

      await this.precioService.updatePrecio(this.id,this.precio)
      swal.fire('Bien hecho!', "El precio ha sido actualizado correctamente", 'success').then(() => this.cerrarModal())

     } catch(error) {
       console.log("Error al actualizar cliente ",error)
       this.texto_boton = "Actualizar"
       swal.fire('Upps!', "Ocurrió un error inesperado", 'error')
     }

     this.muestra_cargando = false;
     this.texto_boton = "Actualizar"

   
  }

  cerrarModal(){
    this.modalRef.hide()
  }

  ngOnInit(): void {
  }

}
