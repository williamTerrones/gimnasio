import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Inscripcion } from '../models/inscripccion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private inscripcionesCollection: AngularFirestoreCollection<Inscripcion>;
  public inscripciones: Inscripcion[] = new Array<Inscripcion>();
  public cargando: boolean = true;

  constructor(private afs: AngularFirestore) {
    this.inscripcionesCollection = afs.collection<Inscripcion>('Inscripciones', ref => ref.where('activo', '==', true));
  }

  getInscripciones() {
    this.inscripcionesCollection.snapshotChanges().subscribe(data => {
      this.inscripciones = data.map(a => {
        const data = a.payload.doc.data() as Inscripcion;
        const id = a.payload.doc.id;
        const ref = a.payload.doc.ref;
        return { id, ...data, ...{ ref: ref } };
      });
      this.cargando = false;
    })
  }

  async getInscripcion(idPrecio: string): Promise<Inscripcion> {
    const doc = await this.inscripcionesCollection.doc(idPrecio).ref.get()
    return doc.exists ? doc.data() as Inscripcion : null;
  }

  addInscripcion(inscripcion : Inscripcion) {
    return new Promise((resolve, reject) => {
      this.inscripcionesCollection.add({ ...inscripcion }).then((resp) => {
        resolve(resp.id)
      }).catch(error => {
        reject(error)
      })
    })
  }

  updateInscripcion(iInscripcion: string, inscripcion: Inscripcion) {
    return new Promise((resolve, reject) => {
      this.inscripcionesCollection.doc(iInscripcion).update({ ...inscripcion }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  deleteInscripcion(idInscripcion: string) {
    return new Promise((resolve, reject) => {
      this.inscripcionesCollection.doc(idInscripcion).update({ activo: false }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
