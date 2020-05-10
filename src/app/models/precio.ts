import { DocumentReference } from 'angularfire2/firestore';

export class Precio {
    activo:boolean = true;
    nombre:string;
    costo:number = 0;
    duracion:number = 1;
    tipo_duracion:number = 0;
    fecha_registro:Date;
    id?:string;
    ref?:DocumentReference;
}