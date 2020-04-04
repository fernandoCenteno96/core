import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes:Cliente[]=new Array<Cliente>();
  constructor(private db:AngularFirestore) { }
  @Input('nombre') nombre:string;
  @Output('selecciono') selecciono=new EventEmitter();
  @Output('cancelo') cancelo= new EventEmitter();
  ngOnInit() {
    this.db.collection('clientes').get().subscribe((resultado)=>{
      this.clientes.length=0;
      resultado.docs.forEach((datos)=>{

        let cliente= datos.data() as Cliente;
        cliente.id=datos.id;
        cliente.ref=datos.ref;
        cliente.visible=false;
        this.clientes.push(cliente);
        
      })
    
    })

  }
  buscarCliente(nombre:string){

  
        this.clientes.forEach((cliente)=>{
              if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase()))
              {
                cliente.visible=true;
              }else{
                cliente.visible=false;
              }
            })
    

  }
  seletCliente(cliente:Cliente){
    this.nombre=cliente.nombre + ' '+cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible=false;
    })
    this.selecciono.emit(cliente);

   
  }
  cancelar(){
    this.nombre=undefined;
    this.cancelo.emit();
  }

}
