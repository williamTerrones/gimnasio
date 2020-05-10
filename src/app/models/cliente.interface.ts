import { DocumentReference } from 'angularfire2/firestore';

export interface ClienteI {
    fecha_registro:Date,
    nombre:string,
    apellidos:string,
    email:string,
    telefono:string,
    domicilio?:string,
    fecha_nacimiento?:any,
    url_imagen?:string,
    id?:string,
    activo:boolean,
    ref?:DocumentReference
}