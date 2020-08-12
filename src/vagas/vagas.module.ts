import { Module } from '@nestjs/common';
import { VagasController } from './vagas.controller';
import { VagasService } from './vagas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VagaSchema } from './schema/vaga.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Vaga', schema: VagaSchema}])],
  controllers: [VagasController],
  providers: [VagasService]
})
export class VagasModule {}
