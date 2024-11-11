import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  imports:[
    //Configuracion de las variables de entorno para este modulo
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    //Config JWT token into the module 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,//We choose the variable from env
      signOptions: { expiresIn: '6h' },
    }),
  ],

  

})
export class AuthModule {}
