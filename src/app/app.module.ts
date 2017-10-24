import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { InfoPedidosComponent } from './components/shared/info-pedidos/info-pedidos.component';
import { ServicesComponent } from './components/shared/services/services.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { SistemaComponent } from './components/sistema/sistema.component';

import { routing } from './app.routing';
import { NavbarSistemaComponent } from './components/sistema/navbar-sistema/navbar-sistema.component';
import { PerfilComponent } from './components/sistema/perfil/perfil.component';
import { RegistroComponent } from './components/sistema/registro/registro.component';
import { UsuariosComponent } from './components/sistema/usuarios/usuarios.component';
import { MenuComponent } from './components/sistema/menu/menu.component';
import { PedidosComponent } from './components/sistema/pedidos/pedidos.component';

import {ProductoService} from './services/producto.service';

//servicios
import { UsuarioService } from './services/usuario.service';
import { MarcaService } from './services/marca.service';
import { CategoriaService } from './services/categoria.service';

import { UsuarioFooterService } from './services/usuario.footer.service';
import { AdministracionComponent } from './components/sistema/administracion/administracion.component';

import {MessagesModule} from 'primeng/primeng';
import { MarcaComponent } from './components/sistema/marca/marca.component';
import { CategoriaComponent } from './components/sistema/categoria/categoria.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ServicesComponent,
    FooterComponent,
    LoginComponent,
    PresentacionComponent,
    SistemaComponent,
    NavbarSistemaComponent,
    PerfilComponent,
    RegistroComponent,
    UsuariosComponent,
    MenuComponent,
    PedidosComponent,
    InfoPedidosComponent,
    AdministracionComponent,
    MarcaComponent,
    CategoriaComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing, MessagesModule
  ],
  providers: [
    ProductoService,
    UsuarioService,
    UsuarioFooterService,
    MarcaService,
    CategoriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
