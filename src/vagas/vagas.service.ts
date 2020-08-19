import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vaga } from './model/vaga';
import { Enter } from './model/enter';

@Injectable()
export class VagasService {
    constructor(
        @InjectModel('Vaga') private readonly vagaModel: Model<Vaga>,
        @InjectModel('VagaReal') private readonly vagaRealModel: Model<Vaga>
        ){

    }
    async getAll(): Promise<Vaga[]> {
        return await this.vagaModel.find().exec();
    }
    async getAllReal(): Promise<Vaga[]> {
        return await this.vagaRealModel.find().exec();
    }
    async freeSpace(spaceId): Promise<String>{
        await this.vagaModel.findOneAndUpdate({'space': spaceId}, {'busy': false, 'carId': ''}, {upsert: true}, function(err) {
            if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return 'ok'
    }
    async freeRealSpace(spaceId): Promise<String>{
        await this.vagaRealModel.findOneAndUpdate({'space': spaceId}, {'busy': false, 'carId': ''}, {upsert: true}, function(err) {
            if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return 'ok'
    }
    async enter(enter: Enter):Promise<String> {
        const spaceNumberForEnter = await this.getSpaceForEnter()
        if(enter.space){
            await this.vagaRealModel.findOneAndUpdate({'space': Number(enter.space)}, {'busy': true, 'carId': enter.car}, {upsert: true}, function(err) {
                if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
            });
        } else {
            await this.vagaRealModel.findOneAndUpdate({'space': spaceNumberForEnter}, {'busy': true, 'carId': enter.car}, {upsert: true}, function(err) {
                if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
            });
        }
        this.vagaModel.findOneAndUpdate({'space': spaceNumberForEnter}, {'busy': true, 'carId': enter.car}, {upsert: true}, function(err) {
            if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
            return 'ok'
        });
        return 'ok'
    }

    async freeAllSpaces(): Promise<String>{
        for (let index = 1; index < 31; index++) {
            await this.vagaModel.findOneAndUpdate({'space': index}, {'busy': false, 'carId': ''}, {upsert: true}, function(err) {
                if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
            });
            
        }
        return 'ok'
    }

    async freeAllRealSpaces(): Promise<String>{
        for (let index = 1; index < 31; index++) {
            await this.vagaRealModel.findOneAndUpdate({'space': index}, {'busy': false, 'carId': ''}, {upsert: true}, function(err) {
                if (err) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
            });
            
        }
        return 'ok'
    }

    async getSpaceForEnter(): Promise<number>{
        const obj = await this.vagaModel.find({'busy': false}).sort('space').limit(1).exec()
        if (obj.length === 0) throw new HttpException('All Busy', HttpStatus.BAD_REQUEST);
        return obj[0].space
    }
    async enterSpace(vaga: Vaga):Promise<Vaga> {
        const vagaSaved = new this.vagaModel(vaga)
        return await vagaSaved.save();
    }
    async enterRealSpace(vaga: Vaga):Promise<Vaga> {
        const vagaSaved = new this.vagaRealModel(vaga)
        return await vagaSaved.save();
    }

    async getLastBusySpace(): Promise<number>{
        const obj = await this.vagaModel.find().sort('-space').limit(1).exec()
        return obj[0].space;
    }
}
