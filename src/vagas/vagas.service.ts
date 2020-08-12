import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vaga } from './model/vaga';

@Injectable()
export class VagasService {
    constructor(@InjectModel('Vaga') private readonly vagaModel: Model<Vaga>){

    }
    async getAll(): Promise<Vaga[]> {
        console.log('FOI')
        console.log(await this.vagaModel.find().exec())
        return await this.vagaModel.find().exec();
    }
    async save(vaga: Vaga):Promise<Vaga> {
        const vagaSaved = new this.vagaModel(vaga)
        return await vagaSaved.save();
    }
}
