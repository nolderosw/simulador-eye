import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vaga } from './model/vaga';

@Injectable()
export class VagasService {
    constructor(@InjectModel('Vaga') private readonly vagaModel: Model<Vaga>){

    }
    async getAll(): Promise<Vaga[]> {
        return await this.vagaModel.find().exec();
    }
    async save(vaga: Vaga):Promise<Vaga> {
        const vagaSaved = new this.vagaModel(vaga)
        return await vagaSaved.save();
    }
    async getLastBusySpace(): Promise<number>{
        const obj = await this.vagaModel.find().sort('-space').limit(1).exec()
        return obj[0].space;
    }
}
