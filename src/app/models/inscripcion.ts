import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Inscripcion{
    id:string;
    ref:DocumentReference;
    fecha:Date;
    fechaFinal:Date;
    cliente:DocumentReference;
    precios:DocumentReference;
    subtotal:number;
    iva:number;
    total:number;
    constructor(){
        this.id=this.id;
        this.ref=this.ref;
        this.fecha=null;
        this.fechaFinal=null;
        this.cliente=this.cliente;
        this.precios=this.precios;
        this.subtotal=this.subtotal;
        this.iva=this.iva;
        this.total=this.total;
    }

    validar(): any{
        let respuesta ={
            esvalido:false,
            mensaje:""
        }
        if(this.cliente==null || this.cliente ==undefined){
         respuesta.esvalido=false;
         respuesta.mensaje="no ha seleccionado un cliente";
         return respuesta; 
      }
        if(this.precios==null || this.precios ==undefined){
         respuesta.esvalido=false;
         respuesta.mensaje="no ha seleccionado  un precio";
         return respuesta; 
      }
      
        if(this.fecha==null || this.fecha ==undefined){
           respuesta.esvalido=false;
           respuesta.mensaje="no tiene fecha de inicio";
           return respuesta; 
        }
        if(this.fechaFinal==null || this.fechaFinal ==undefined){
            respuesta.esvalido=false;
            respuesta.mensaje="no tiene fecha final de inicio";
            return respuesta; 
         }
         if(this.subtotal<=0 || this.subtotal ==undefined){
            respuesta.esvalido=false;
            respuesta.mensaje="no se ha podido calcular el subtotal";
            return respuesta; 
         }
         if(this.iva<=0 || this.iva ==undefined){
            respuesta.esvalido=false;
            respuesta.mensaje="no se ha podido calcular el iva";
            return respuesta; 
         }
         if(this.total<=0 || this.total ==undefined){
            respuesta.esvalido=false;
            respuesta.mensaje="no se ha podido calcular el total";
            return respuesta; 
         }
         respuesta.esvalido=true;
         
         return respuesta;
    }
}