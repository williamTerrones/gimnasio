import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { ClienteI } from '../models/cliente.interface';
import { Cliente } from '../models/cliente';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesCollection: AngularFirestoreCollection<ClienteI>;
  public clientes:ClienteI[] = new Array<ClienteI>();
  public cargando:boolean = true;

  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) { 
    this.clientesCollection = afs.collection<ClienteI>('Clientes');
    this.getClientes();
  }

  uploadImage(idCliente:string,imagen){
    return new Promise((resolve,reject) => {

      const task = this.afStorage.upload(`Clientes/${idCliente}/${idCliente}`, imagen);
      const ref = this.afStorage.ref(`Clientes/${idCliente}/${idCliente}`); 

      task.snapshotChanges()
      .pipe(
        finalize(() => {
          const url = ref.getDownloadURL()
          url.subscribe((url_imagen) => resolve(url_imagen))
        })
      ).subscribe();

    })
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
        resolve(resp.id)
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
