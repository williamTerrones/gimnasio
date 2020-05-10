import { DocumentReference } from 'angularfire2/firestore';

export class Inscripcion {
	activo:boolean = true;
	fecha_inicial:Date;
	fecha_final:Date;
	cliente:DocumentReference;
	precios:DocumentReference;
	subtotal:number;
	descuento?:number;
	iva:number;
	total:number;
}