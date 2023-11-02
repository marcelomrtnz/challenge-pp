import { Module } from '@nestjs/common';
import { ListaController } from './lista.controller';

export interface entradaLista {
    id: number
    contenido: string
    seleccionada: boolean
}
  
@Module({
  controllers: [ListaController]
})
export class ListaModule {}
