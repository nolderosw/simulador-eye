import { Controller, Get, Post, Body } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { Vaga } from './model/vaga';

@Controller('vagas')
export class VagasController {
    constructor(private vagasService: VagasService){
    }
    @Get()
    async getAll(): Promise<Vaga[]>{
        return this.vagasService.getAll();
    }
    @Post()
    async save(@Body() vaga:Vaga): Promise<Vaga>{
        return this.vagasService.save(vaga);
    }
}
