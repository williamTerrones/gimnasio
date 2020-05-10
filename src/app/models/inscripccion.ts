import { DocumentReference } from 'angularfire2/firestore';

export class Inscripcion {
	activo:boolean = true;
	fecha:Date;
	fecha_final:Date;
	cliente:DocumentReference;
	precios:DocumentReference;
	subtotal:number;
	iva:number;
	total:number;
}