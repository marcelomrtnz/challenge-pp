import { Module } from '@nestjs/common';
import { ListaController } from './lista.controller';
import { ListaService } from './lista.service';
import { ConfigModule } from '@nestjs/config';

export interface entradaLista {
    id: number
    contenido: string
    seleccionada: boolean
}
  
@Module({
  imports: [
    ConfigModule
  ],
  controllers: [ListaController],
  providers: [ListaService]
})
export class ListaModule {}
