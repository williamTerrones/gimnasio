import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

interface ListaI {
  id:string,
  nombre:string,
}

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  clienteSeleccionado:string = null;
  busqueda:string = "";
  url_imagen:string = '';
  @Output("seleccionoCliente") seleccionoCliente = new EventEmitter();

  constructor(public clienteService:ClienteService) {
    
   }

   seleccionarCliente(){
     this.seleccionoCliente.emit(this.clienteSeleccionado)
   }

   buscarImagen(){

    const cliente = this.clienteService.clientes.find(cliente=>cliente.id===this.clienteSeleccionado)
     
     if(cliente){
       if(cliente.url_imagen){
        return cliente.url_imagen
       }
     }
     return 'assets/img/user.png'

   }


  ngOnInit(): void {
  }

}
