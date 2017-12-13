import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { LoginComponent} from './components/login/login.component';
import { AdminProductosComponent} from './components/administrador/admin-productos/admin-productos.component';
import { RegistrarProductoComponent } from './components/administrador/registrar-producto/registrar-producto.component';
import { AdminMarcaComponent } from './components/administrador/admin-marca/admin-marca.component';
import { AdminCategoriaComponent } from './components/administrador/admin-categoria/admin-categoria.component';
import { AdminUsuariosComponent} from './components/administrador/admin-usuarios/admin-usuarios.component';
import { RegistroUsuariosAdminComponent} from './components/administrador/registro-usuarios-admin/registro-usuarios-admin.component';
import { RegistroClienteComponent} from './components/registro-cliente/registro-cliente.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { CaractProductoComponent } from './components/caract-producto/caract-producto.component';
import { CarritoComponent} from './components/carrito/carrito.component';
import { VerificarDatosComponent} from './components/verificar-datos/verificar-datos.component';
import { EmpresaComponent} from './components/administrador/empresa/empresa.component';
import { ProductosComponent} from './components/productos/productos.component';
import { InformacionFinalComponent} from './components/informacion-final/informacion-final.component';
import { AdminOpcionesComponent } from './components/administrador/admin-opciones/admin-opciones.component';
import { PedidoComponent } from './components/administrador/pedido/pedido.component';

const APP_ROUTES: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-productos', component: AdminProductosComponent},
  {path: 'registrar-producto/:id', component: RegistrarProductoComponent},
  {path: 'marca/:id' , component: AdminMarcaComponent},
  {path: 'categoria/:id' , component: AdminCategoriaComponent},
  {path: 'admin-usuarios' , component: AdminUsuariosComponent},
  {path: 'registrar-usuariosAdmin/:id' , component: RegistroUsuariosAdminComponent},
  {path: 'registrarse' , component: RegistroClienteComponent},
  {path: 'contactanos' , component: ContactenosComponent},
  {path: 'producto/:id/:nombre' , component: CaractProductoComponent},
  {path: 'carrito' , component: CarritoComponent},
  {path: 'verificar' , component: VerificarDatosComponent},
  {path: 'empresa' , component: EmpresaComponent},
  {path: 'productos' , component: ProductosComponent},
  {path: 'informacionfinal' , component: InformacionFinalComponent},
  {path: 'opcion/:id' , component: AdminOpcionesComponent},
  {path: 'pedido' , component: PedidoComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
