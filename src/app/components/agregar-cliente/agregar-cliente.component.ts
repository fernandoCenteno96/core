import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MensajesService } from 'src/app/services/mensajes.service';
@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  FormClient:FormGroup;
  porcentaje:number=0;
  imagenUrl:string='';
  Editar:boolean=false;
  id:string;
  constructor(
    private fb:FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private activeRoute:ActivatedRoute,
    private mensaje:MensajesService
    ) { }

  ngOnInit() {
    
    this.FormClient=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',Validators.compose([Validators.required,Validators.email])],
      cedula:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      imgUrl:['',Validators.required],
      telefono:['']
    });

  
    this.id=this.activeRoute.snapshot.params.clienteId;
    if(this.id!= undefined){
       this.Editar=true;
        this.afs.doc<any>('clientes'+'/'+this.id).valueChanges().subscribe((clienteObtenido)=>{

         this.FormClient.setValue({
         nombre:clienteObtenido.nombre,
         apellido:clienteObtenido.apellido,
         correo:clienteObtenido.correo,
         cedula:clienteObtenido.cedula,
         fechaNacimiento:new Date (clienteObtenido.fechaNacimiento.seconds *1000).toISOString().substr(0,10),
         telefono:clienteObtenido.telefono,
         imgUrl:''
       });
       this.imagenUrl=clienteObtenido.imgUrl;
      });
      
    }
  
    
    }

    guardar(){
      this.FormClient.value.imgUrl=this.imagenUrl;
      this.FormClient.value.fechaNacimiento=new Date(this.FormClient.value.fechaNacimiento);
      this.afs.collection('clientes').add(this.FormClient.value)
              .then((termino)=>{
                this.mensaje.mensajeSuccess("guardado Correctamente","presiona ok para continuar");
              }).catch((e)=>{
                this.mensaje.mensajeError("Hubo un error al guardar el cliente","presiona ok para continuar");
              });
    }
    editar(){
      
      this.FormClient.value.imgUrl=this.imagenUrl;
      this.FormClient.value.fechaNacimiento=new Date(this.FormClient.value.fechaNacimiento);
      this.afs.doc('clientes/'+this.id).update(this.FormClient.value)
          .then((termino)=>{
            this.mensaje.mensajeSuccess("Se edito Correctamente","Presiona Ok para continuar");
          }).catch((e)=>{
            this.mensaje.mensajeError("Hubo un error al editar el cliente","Presiona ok para continuar");
          });
    }


    upload(event){

      if(event.target.files.length > 0 ){
      let filename=new Date().getTime().toString();
      let file = event.target.files[0];
      let extencion=file.name.toString().substring(file.name.toString().lastIndexOf('.'))

      let ruta = 'clientes/'+filename+extencion;
      const ref = this.storage.ref(ruta);
        const task = ref.put(file);
        task.percentageChanges().subscribe((porcentajesubida)=>{
          this.porcentaje=parseInt(porcentajesubida.toString());
          
        })
        task.then((objeto)=>{
          ref.getDownloadURL().subscribe((url)=>{
            this.imagenUrl=url;
           
          })
        })
        
      }  
    }
}
