import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, DocumentData } from 'angularfire2/firestore';
import { ClienteI } from '../models/cliente.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

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
    this.clientesCollection.snapshotChanges().subscribe(data => {
      this.clientes = data.map(a => {
        const data = a.payload.doc.data() as ClienteI;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      this.cargando = false;
    })
  }

  async getCliente(idCliete:string) : Promise<ClienteI> {
    const doc = await this.clientesCollection.doc(idCliete).ref.get()
    return doc.exists ? doc.data() as ClienteI : null;
  }

  addCliente(cliente: Cliente) {
    return new Promise((resolve,reject) => {
      this.clientesCollection.add({...cliente}).then((resp) => {
        resolve(resp)
      }).catch(error => {
        reject(error)
      })
    })
  }

  updateCliente(idCliente:string,cliente:Cliente){
    return new Promise((resolve,reject) => {
      this.clientesCollection.doc(idCliente).update({...cliente}).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}
