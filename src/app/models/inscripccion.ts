import { DocumentReference } from 'angularfire2/firestore';

export class Inscripcion {
	activo:boolean = true;
	fecha_inicial:Date;
	fecha_final:Date;
	cliente:DocumentReference;
	precio:DocumentReference;
	subtotal:number;
	descuento?:number;
	iva:number = 16;
	total:number;
}