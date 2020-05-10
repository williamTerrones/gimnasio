import { Component, OnInit } from '@angular/core';
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

  constructor(public clienteService:ClienteService) {
    
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
