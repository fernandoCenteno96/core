import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './components/precios/precios.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';


const routes: Routes = [
  {path:'',redirectTo:'inscripcion' ,pathMatch: 'full'},
  { path:'inscripcion',component:InscripcionComponent},
  { path:'listadoClientes', component:ListadoClientesComponent},
  { path:'agregarCliente',component:AgregarClienteComponent},
  { path:'agregarCliente/:clienteId',component:AgregarClienteComponent},
  { path:'precios',component:PreciosComponent},
  { path:'inscritos',component:ListadoInscripcionesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
