/**
 * Created by Vinicio on 8/8/2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { LoginComponent } from './components/login/login.component';
import { SistemaComponent } from './components/sistema/sistema.component';
import { PerfilComponent } from './components/sistema/perfil/perfil.component';
import { MenuComponent } from './components/sistema/menu/menu.component';
import { PedidosComponent } from './components/sistema/pedidos/pedidos.component';
import { RegistroComponent } from './components/sistema/registro/registro.component';
import { UsuariosComponent } from './components/sistema/usuarios/usuarios.component';
import { AdministracionComponent } from './components/sistema/administracion/administracion.component';

const appRoutes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'presentacion', component: PresentacionComponent },
  { path: 'sistema', component: SistemaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'registro/:id', component: RegistroComponent },
  { path: 'usuario/:id', component: UsuariosComponent },
  {path: 'usuarios' , component: AdministracionComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: 'presentacion' }
];

export const routing = RouterModule.forRoot(appRoutes);
