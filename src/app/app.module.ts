import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

// Cloudinary module
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-4.x';
import * as cloudinary from 'cloudinary-core';
import {CloudinarySettings} from './settings';
import { FileUploadModule } from 'ng2-file-upload';

//MAPA
import { AgmCoreModule } from '@agm/core';


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
import { CelularesComponent } from './components/celulares/celulares.component';
import { CaractProductoComponent } from './components/caract-producto/caract-producto.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { VerificarDatosComponent } from './components/verificar-datos/verificar-datos.component';
import { LogoComponent } from './components/administrador/logo/logo.component';

//Primeng
//import {MessagesModule} from 'primeng/primeng';

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
    CelularesComponent,
    CaractProductoComponent,
    LaptopsComponent,
    CarritoComponent,
    VerificarDatosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    CloudinaryModule.forRoot(cloudinary, CloudinarySettings),
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1HDcId9-ArNag9QzqA8pByXbuHhn48z8'
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
    LogoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
