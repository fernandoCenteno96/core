import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Precio }from 'src/app/models/precio';


@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  FormPrecio:FormGroup;
  precios:Precio[]=new Array<Precio>();
  editar:boolean=false;
  id:string="";
  constructor(
    private fb:FormBuilder,
    private db: AngularFirestore,
    private msj:MensajesService
    ) { }

  ngOnInit() {
    this.FormPrecio=this.fb.group({
      nombre:['',Validators.required],
      costo:['',Validators.required],
      duracion:['',Validators.required],
      tipoDuracion:['',Validators.required]
    })

    this.Mostrar();


    }
    Mostrar(){
      this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
        this.precios.length=0;
        resultado.docs.forEach((datos)=>{
         let precio=datos.data() as Precio;
         precio.id=datos.id;
         precio.ref=datos.ref;
         this.precios.push(precio);
        })
       })
    }
    agregar(){
      this.db.collection<Precio>('precios').add(this.FormPrecio.value)
              .then(()=>{
                this.msj.mensajeSuccess('Agregado exitoso',"Presiona Ok para continuar")
                this.FormPrecio.reset();
                this.Mostrar();
              }).catch(()=>{
                this.msj.mensajeError("ocurrio un error","Presiona Ok para continuar")
              })
              
    }
    seleccionar(precio:Precio){
      this.editar=true;
      this.FormPrecio.setValue({
        nombre:precio.nombre,
        costo:precio.costo,
        duracion:precio.duracion,
        tipoDuracion:precio.tipoDuracion

      })
      this.id=precio.id;
    } 
    actualizar(){
      this.db.doc('precios/'+this.id).update(this.FormPrecio.value)
            .then(()=>{
              this.msj.mensajeSuccess('edito correctamente',"Click ok para continuar");
              this.editar=false;
              this.FormPrecio.reset();
              this.Mostrar();
            }).catch(()=>{
              this.msj.mensajeError("error al editar","presiona ok para continuar");
            })
    }
}
