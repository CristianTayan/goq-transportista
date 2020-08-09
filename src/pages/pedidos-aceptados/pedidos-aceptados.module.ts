import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosAceptadosPage } from './pedidos-aceptados';

@NgModule({
  declarations: [
    PedidosAceptadosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosAceptadosPage),
  ],
})
export class PedidosAceptadosPageModule {}
