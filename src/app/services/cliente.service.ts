import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ClienteI } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesCollection: AngularFirestoreCollection<ClienteI>;
  public clientes:ClienteI[] = new Array<ClienteI>();
  public cargando:boolean = true;

  constructor(private afs: AngularFirestore) { 
    this.clientesCollection = afs.collection<ClienteI>('Clientes');
    this.getClientes();
  }

  getClientes(){
    this.clientesCollection.valueChanges().subscribe(clientes => {
      this.clientes = clientes;
      this.cargando = false;
    })
  }

  addCliente(cliente: ClienteI) {
    this.clientesCollection.add(cliente);
  }

}
