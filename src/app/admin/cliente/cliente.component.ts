import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import swal from'sweetalert2';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public cargado_informacion:boolean = false;
  public es_nuevo:boolean = true;
  public muestra_cargando:boolean = false;
  public id_cliente:string = null;
  public titulo_boton:string = "Guardar";
  public imagen:File = null;
  

  constructor(public clienteService:ClienteService,public route: ActivatedRoute,public router:Router) {

    this.id_cliente = this.route.snapshot.paramMap.get('id_cliente')
    if(this.id_cliente!=="nuevo"){
      this.obtenerCliente();
    }

   }

   async seleccionarArchivo(e){

    if (!e.target.files.length) {
      this.imagen = null;
      return null;
    }

    this.imagen = e.target.files[0];

    console.log("Imagen ", this.imagen)


   }

   async obtenerCliente(){
    this.cargado_informacion = true;
    this.es_nuevo = false;
    this.cliente = await this.clienteService.getCliente(this.id_cliente)
    this.cargado_informacion = false;
    if(this.cliente==null){
      await swal.fire("Upps!","El cliente no ha sido encontrado","error")
      this.regresarAClientes()
    }
    this.titulo_boton = "Actualizar";
   }

   regresarAClientes(){
    this.router.navigateByUrl('/admin/clientes')
   }

   async guardarCliente(){

     try{

      this.titulo_boton = "Cargando..."
      this.muestra_cargando = true;

      const id:string = await this.clienteService.addCliente(this.cliente) as string
       
      if(this.imagen!==null){
         const url_imagen:string = await this.clienteService.uploadImage(id,this.imagen) as string;
         this.cliente.url_imagen = url_imagen;
         await this.clienteService.updateCliente(id,this.cliente)
         swal.fire('Bien hecho!', "El cliente ha sido actualizado correctamente", 'success').then(() => this.regresarAClientes())
       }

     } catch(error) {
       console.log("Error al guardar cliente ",error)
       this.titulo_boton = "Guardar";
       swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
     }

     this.muestra_cargando = false;

   }

   async actualizarCliente(){
    
    try{
      
      this.titulo_boton = "Cargando..."
      this.muestra_cargando = true;

      if(this.imagen!==null){
        const url_imagen:string = await this.clienteService.uploadImage(this.id_cliente,this.imagen) as string;
        this.cliente.url_imagen = url_imagen;
      }

      console.log("Actualiza cliente ", this.cliente)

      await this.clienteService.updateCliente(this.id_cliente,this.cliente)
      swal.fire('Bien hecho!', "El cliente ha sido actualizado correctamente", 'success').then(() => this.regresarAClientes())

     } catch(error) {
       console.log("Error al actualizar cliente ",error)
       this.titulo_boton = "Actualizar"
       swal.fire('Upps!', "Ocurrió un error inesperado", 'error')
     }

     this.muestra_cargando = false;

   }

  ngOnInit(): void {
  }

}
