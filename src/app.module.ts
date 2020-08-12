import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { VagasModule } from './vagas/vagas.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://wesley150:147wesley@eye-simulator.xidim.mongodb.net/eye-simulator?retryWrites=true&w=majority'), 
  VagasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
