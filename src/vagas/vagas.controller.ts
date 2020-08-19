import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { VagasReponse } from './model/vagasResponse';
import { Enter } from './model/enter';

@Controller('vagas')
export class VagasController {
    constructor(private vagasService: VagasService){
    }
    @Get()
    async getAll(): Promise<VagasReponse>{
        return {
            spaces: await this.vagasService.getAll(), 
            realSpaces: await this.vagasService.getAllReal()
        }
    }
    @Post()
    async enter(@Body() enter:Enter): Promise<String>{
        return this.vagasService.enter(enter);
    }
    @Put()
    async freeAllSpaces(): Promise<String>{
        return this.vagasService.freeAllSpaces()
    }
    @Put('/real')
    async freeAllRealSpaces(): Promise<String>{
        return this.vagasService.freeAllRealSpaces()
    }
    @Put(':id')
    async freeSpace(@Param('id') spaceId): Promise<String>{
        return this.vagasService.freeSpace(spaceId)
    }
    @Put('/real/:id')
    async freeRealSpaces(@Param('id') spaceId): Promise<String>{
        return this.vagasService.freeRealSpace(spaceId)
    }
}
