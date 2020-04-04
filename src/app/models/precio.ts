import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Precio {
    id:string;
    ref:DocumentReference;
    nombre:string;
    costo:number;
    duracion:number;
    tipoDuracion:number;


}