import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public cargando:boolean = true;
  

  constructor(public clienteService:ClienteService,public route: ActivatedRoute,) {
    this.obtenerCliente();
   }

   async obtenerCliente(){
    console.log("Empieza a obtener cliete ")
    this.cliente = await this.clienteService.getCliente(this.route.snapshot.paramMap.get('id_cliente'))
    this.cargando = false;
    if(this.cliente==null){
      console.log("Cliente null")
    } else {
      console.log("Cliente ", this.cliente)
    }
   }

  ngOnInit(): void {
  }

}
