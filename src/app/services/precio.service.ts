import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Precio } from '../models/precio';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  private preciosCollection: AngularFirestoreCollection<Precio>;
  public precios:Precio[] = new Array<Precio>();
  public cargando:boolean = true;

  constructor(private afs: AngularFirestore) { 
    this.preciosCollection = afs.collection<Precio>('Precios',ref => ref.where('activo','==',true));
  }

  getPrecios(){
    this.preciosCollection.snapshotChanges().subscribe(data => {
      this.precios = data.map(a => {
        const data = a.payload.doc.data() as Precio;
        const id = a.payload.doc.id;
        const ref = a.payload.doc.ref;
        return { id, ...data,...{ref:ref} };
      });
      console.log("Precios ", this.precios)
      this.cargando = false;
    })
  }

  async getPrecio(idPrecio:string) : Promise<Precio> {
    const doc = await this.preciosCollection.doc(idPrecio).ref.get()
    return doc.exists ? doc.data() as Precio : null;
  }

  addPrecio(precio:Precio) {
    return new Promise((resolve,reject) => {
      this.preciosCollection.add({...precio}).then((resp) => {
        resolve(resp.id)
      }).catch(error => {
        reject(error)
      })
    })
  }

  updatePrecio(idPrecio:string,precio:Precio){
    return new Promise((resolve,reject) => {
      this.preciosCollection.doc(idPrecio).update({...precio}).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  deletePrecio(idPrecio:string){
    return new Promise((resolve,reject) => {
      this.preciosCollection.doc(idPrecio).update({activo:false}).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }


}
