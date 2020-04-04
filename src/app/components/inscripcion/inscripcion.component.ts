import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Cliente } from 'src/app/models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from 'src/app/models/precio';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcion :Inscripcion=new Inscripcion();
  clienteSeleccionado:Cliente=new Cliente();
  precios:Precio[]= new Array<Precio>();
  precioSelecionado:Precio= new Precio();
  idprecio:string=null;


  constructor(private db:AngularFirestore,private msj:MensajesService) { }

  ngOnInit() {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((datos)=>{
        let precio =datos.data() as Precio;
        precio.id=datos.id;
        precio.ref=datos.ref;

        this.precios.push(precio);
      })

    })
  }
  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente=cliente.ref;
    this.clienteSeleccionado=cliente;

  }
  eliminarCliente(){
    this.clienteSeleccionado=new Cliente();
    this.inscripcion.cliente=undefined;
  }
  guardar(){

    if(this.inscripcion.validar().esvalido)
    {
      let inscripcionAgregar={
        fecha:this.inscripcion.fecha,
        fechaFinal:this.inscripcion.fechaFinal,
        cliente:this.inscripcion.cliente,
        precios:this.inscripcion.precios,
        subtotal:this.inscripcion.subtotal,
        iva:this.inscripcion.iva,
        total:this.inscripcion.total
      }
      this.db.collection('inscripciones').add(inscripcionAgregar)
          .then((resultado)=>{

          this.msj.mensajeSuccess("Guardado Con Exito","Presiona Ok Para Continuar");
          this.inscripcion=new Inscripcion();
          this.clienteSeleccionado = new Cliente();
          this.precioSelecionado=new Precio();
          this.idprecio="null";

        }).catch(()=>{
        this.msj.mensajeError("Error al Guardar","Presiona Ok Para Continuar");
        })
    }else{
      this.msj.mensajeAdvertencia(this.inscripcion.validar().mensaje,"Presiona Ok para continuar");
    }
  }
  selecionarPrecio(id:string){
    if(id != "null"){
        this.precioSelecionado=this.precios.find(x=> x.id ==id);
            this.inscripcion.precios=this.precioSelecionado.ref;
            this.inscripcion.fecha=new Date();
            this.inscripcion.subtotal= this.precioSelecionado.costo;
            this.inscripcion.iva=this.inscripcion.subtotal * 0.16;
            this.inscripcion.total=this.inscripcion.subtotal + this.inscripcion.iva;

            if(this.precioSelecionado.tipoDuracion==1){
              let dias:number=this.precioSelecionado.duracion;
              let fechaFinal=new Date(
                                      this.inscripcion.fecha.getFullYear(),
                                      this.inscripcion.fecha.getMonth(),
                                      this.inscripcion.fecha.getDate()+ dias);
              this.inscripcion.fechaFinal=fechaFinal;

              
            }
            if(this.precioSelecionado.tipoDuracion==2){
              let dias:number=this.precioSelecionado.duracion *7;
              let fechaFinal=new Date(
                                      this.inscripcion.fecha.getFullYear(),
                                      this.inscripcion.fecha.getMonth(),
                                      this.inscripcion.fecha.getDate()+ dias);
              this.inscripcion.fechaFinal=fechaFinal;
            }
            if(this.precioSelecionado.tipoDuracion==3){
              let dias:number=this.precioSelecionado.duracion *15;
              let fechaFinal=new Date(
                                      this.inscripcion.fecha.getFullYear(),
                                      this.inscripcion.fecha.getMonth(),
                                      this.inscripcion.fecha.getDate()+ dias);
              this.inscripcion.fechaFinal=fechaFinal;
            }
            if(this.precioSelecionado.tipoDuracion==4){
              let meses = this.precioSelecionado.duracion + this.inscripcion.fecha.getMonth();
              let anio:number=this.inscripcion.fecha.getFullYear();
              let dia:number=this.inscripcion.fecha.getDate();

              let fechaFinal=new Date(anio,meses,dia);
              this.inscripcion.fechaFinal=fechaFinal;
            }
            if(this.precioSelecionado.tipoDuracion==5){
              let meses = this.precioSelecionado.duracion;
              let anio:number=this.inscripcion.fecha.getFullYear()+ this.precioSelecionado.duracion;
              let dia:number=this.inscripcion.fecha.getDate();

              let fechaFinal=new Date(anio,meses,dia);
              this.inscripcion.fechaFinal=fechaFinal;
            }
    }else{
      this.precioSelecionado = new Precio();
      this.inscripcion.precios=undefined;
      this.inscripcion.subtotal=0;
      this.inscripcion.total=0;
      this.inscripcion.iva=0;
      this.inscripcion.fecha=null;
      this.inscripcion.fechaFinal=null;
    }
    
  }
}

