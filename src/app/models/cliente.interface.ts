export interface ClienteI {
    nombre:string,
    apellidos:string,
    email:string,
    telefono:string,
    domicilio?:string,
    url_imagen?:string,
    id?:string,
    activo:boolean,
}