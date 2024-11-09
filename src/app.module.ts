// Seperar la estructura de 3 de las .env
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
// Se usa paa constatactar que la conexion este funcionando correctamente
  // constructor(){
  //   console.log(process.env)
  // }

}
