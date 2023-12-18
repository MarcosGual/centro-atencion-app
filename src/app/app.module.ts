import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './atenciones/listado/listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModificarComponent } from './atenciones/modificar/modificar.component';
import { MasIvaPipe } from './pipes/mas-iva.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ModificarComponent,
    MasIvaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
