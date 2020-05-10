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
    this.preciosCollection = afs.collection<Precio>('Precios');
  }

  getPrecios(){
    this.preciosCollection.snapshotChanges().subscribe(data => {
      this.precios = data.map(a => {
        const data = a.payload.doc.data() as Precio;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      console.log("Precios ", this.precios)
      this.cargando = false;
    })
  }


}
