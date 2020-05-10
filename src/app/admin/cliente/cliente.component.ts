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
  public cargando:boolean = false;
  public id_cliente:string = null;
  public es_nuevo:boolean = true;
  public imagen:File = null;
  

  constructor(public clienteService:ClienteService,public route: ActivatedRoute,
    public router:Router) {
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
    this.cargando = true;
    this.es_nuevo = false;
    this.cliente = await this.clienteService.getCliente(this.id_cliente)
    this.cargando = false;
    if(this.cliente==null){
      swal.fire("Upps!","El cliente no ha sido encontrado","error")
      this.regresarAClientes()
    }
   }

   regresarAClientes(){
    this.router.navigateByUrl('/admin/clientes')
   }

   async guardarCliente(){

     try{
       
      const id:string = await this.clienteService.addCliente(this.cliente) as string
       
      if(this.imagen!==null){
         const url_imagen:string = await this.clienteService.uploadImage(id,this.imagen) as string;
         this.cliente.url_imagen = url_imagen;
         await this.clienteService.updateCliente(id,this.cliente)
         await swal.fire('Bien hecho!', "El cliente ha sido actualizado correctamente", 'success');
         this.regresarAClientes()
       }

     } catch(error) {
       console.log("Error al guardar cliente ",error)
       await swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
       this.regresarAClientes()
     }

   }

   async actualizarCliente(){
    
    try{

      if(this.imagen!==null){
        const url_imagen:string = await this.clienteService.uploadImage(this.id_cliente,this.imagen) as string;
        this.cliente.url_imagen = url_imagen;
      }

      await this.clienteService.updateCliente(this.id_cliente,this.cliente)
      await swal.fire('Bien hecho!', "El cliente ha sido actualizado correctamente", 'success');
      this.regresarAClientes()

     } catch(error) {
       console.log("Error al actualizar cliente ",error)
       await swal.fire('Upps!', "Ocurrió un error inesperado", 'error');
       this.regresarAClientes()
     }

   }

  ngOnInit(): void {
  }

}