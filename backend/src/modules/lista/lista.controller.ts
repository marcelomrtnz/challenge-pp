import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { entradaLista } from './lista.module';
import { ListaService } from './lista.service';

@Controller('lista')
export class ListaController {
    constructor(private readonly listaService: ListaService) {}

    @Get()
    verLista() {
        return this.listaService.verLista()
    }

    @Post()
    actualizarLista(@Body() nuevaLista:entradaLista[]) {
        return this.listaService.actualizarLista(nuevaLista)
    }
}
