import { convertirFechaString } from '../constants/helpers';

export class Cliente {
    fecha_registro:Date;
    nombre:string;
    apellidos:string;
    email:string;
    telefono:string;
    domicilio?:string;
    fecha_nacimiento?:any = null;
    url_imagen?:string;
    id?:string;
    activo:boolean = true;

    constructor(cliente?:Cliente){
        if(cliente!==undefined){
            if(cliente.fecha_nacimiento!==undefined && cliente.fecha_nacimiento!==null){
                this.fecha_nacimiento = convertirFechaString(cliente.fecha_nacimiento.seconds)
            }
        }
    }

}