import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//RUTAS
import { APP_ROUTING } from './app.routes';

//SERVICIOS
import { UsuarioService } from './services/usuario.service';
import { ProductoService } from './services/producto.service';
import { MarcaService } from './services/marca.service';
import { CategoriaService } from './services/categoria.service';
import { ClienteService } from './services/cliente.service';
import { PaginationService } from './services/pagination.service';//PARA LA PAGINACION
import { CarritoService } from './services/carrito.service';
import { LogoService } from './services/logo.service';
import { OpcionService } from './services/opcion.service';
import { PedidoService } from './services/pedido.service';
import { Pagination2Service } from './services/pagination2.service';//PARA LA PAGINACION
import { PaginationAdminService } from './services/pagination-admin.service';//PARA LA PAGINACION

// Cloudinary module
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core';
import {CloudinarySettings} from './settings';
import { FileUploadModule } from 'ng2-file-upload';

//MAPA
import { AgmCoreModule } from '@agm/core';

//ZOOM IMG
import {ImageZoomModule} from 'angular2-image-zoom';

//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductosComponent } from './components/administrador/admin-productos/admin-productos.component';
import { RegistrarProductoComponent } from './components/administrador/registrar-producto/registrar-producto.component';
import { AdminMarcaComponent } from './components/administrador/admin-marca/admin-marca.component';
import { AdminCategoriaComponent } from './components/administrador/admin-categoria/admin-categoria.component';
import { NavbarAdminComponent } from './components/administrador/navbar-admin/navbar-admin.component';
import { AdminUsuariosComponent } from './components/administrador/admin-usuarios/admin-usuarios.component';
import { RegistroUsuariosAdminComponent } from './components/administrador/registro-usuarios-admin/registro-usuarios-admin.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { CaractProductoComponent } from './components/caract-producto/caract-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { VerificarDatosComponent } from './components/verificar-datos/verificar-datos.component';
import { EmpresaComponent } from './components/administrador/empresa/empresa.component';
import { ProductosComponent } from './components/productos/productos.component';
import { InformacionFinalComponent } from './components/informacion-final/informacion-final.component';
import { AdminOpcionesComponent } from './components/administrador/admin-opciones/admin-opciones.component';
import { PedidoComponent } from './components/administrador/pedido/pedido.component';

//Primeng
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
//Autocomplete
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BuscadorComponent } from './components/buscador/buscador.component';

//Ng2 Expansion Panels
import { ExpansionPanelsModule } from 'ng2-expansion-panels';

//Sails
import {SailsModule} from "angular2-sails";

//SweetAlert
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { PaypalComponent } from './components/paypal/paypal.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    AdminProductosComponent,
    RegistrarProductoComponent,
    AdminMarcaComponent,
    AdminCategoriaComponent,
    NavbarAdminComponent,
    AdminUsuariosComponent,
    RegistroUsuariosAdminComponent,
    RegistroClienteComponent,
    ContactenosComponent,
    NosotrosComponent,
    CaractProductoComponent,
    CarritoComponent,
    VerificarDatosComponent,
    EmpresaComponent,
    ProductosComponent,
    InformacionFinalComponent,
    AdminOpcionesComponent,
    BuscadorComponent,
    PedidoComponent,
    PaypalComponent,
    CategoriasComponent,
  ],
  imports: [
    BrowserModule, GrowlModule, MessagesModule, NguiAutoCompleteModule,
    FormsModule, ReactiveFormsModule, ExpansionPanelsModule,
    HttpModule,
    APP_ROUTING,
    CloudinaryModule.forRoot(cloudinaryLib, CloudinarySettings),
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1HDcId9-ArNag9QzqA8pByXbuHhn48z8'
    }),
    ImageZoomModule,
    SailsModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  providers: [
    UsuarioService,
    ProductoService,
    MarcaService,
    CategoriaService,
    ClienteService,
    PaginationService,
    CarritoService,
    LogoService,
    OpcionService,
    PedidoService,
    Pagination2Service,
    PaginationAdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
