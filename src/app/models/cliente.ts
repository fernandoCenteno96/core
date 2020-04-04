import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Cliente{
    id:string;
    ref:DocumentReference;
    nombre:string;
    apellido:string;
    correo:string;
    cedula:string;
    fechaNacimiento:Date;
    imgUrl:string;
    telefono:number;
    visible:boolean;
    constructor(){
        
      
    }
}