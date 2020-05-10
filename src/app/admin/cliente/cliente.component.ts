import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteI } from 'src/app/models/cliente.interface';


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
  

  constructor(public clienteService:ClienteService,public route: ActivatedRoute,) {
    this.id_cliente = this.route.snapshot.paramMap.get('id_cliente')
    if(this.id_cliente!=="nuevo"){
      this.obtenerCliente();
    }
   }

   async obtenerCliente(){
    this.cargando = true;
    this.es_nuevo = false;
    this.cliente = await this.clienteService.getCliente(this.id_cliente)
    this.cargando = false;
    if(this.cliente==null){
      console.log("Cliente null")
    } else {
      console.log("Cliente ", this.cliente)
    }
   }

   async guardarCliente(){

     try{
      const resp = await this.clienteService.addCliente(this.cliente)
      console.log(resp)
     } catch(error) {
       console.log("Error al guardar cliente ",error)
     }

   }

   async actualizarCliente(){
    
    try{
      const resp = await this.clienteService.updateCliente(this.id_cliente,this.cliente)
     } catch(error) {
       console.log("Error al actualizar cliente ",error)
     }
     
   }

  ngOnInit(): void {
  }

}
