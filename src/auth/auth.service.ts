import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Encriptdor
import * as bcrypt from 'bcryptjs';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-userdto';
import { User } from './entities/user.entity';


@Injectable()
export class AuthService {

  // Inyeccion de dependencia
  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>
  ){}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    // console.log(createAuthDto);

    //This is the way to handle errors using functions from Nest
    try {

      //Encriptacion
      const {password, ...userData} = CreateUserDto;
      const newUser = new this.userModel({
        password: bcrypt.hashSync( password, 10),
        ...userData
      })
      //Devolver la consulta sin exhibir la contraseña
      await newUser.save();
      const{ password:_, ...user } = newUser.toJSON();

      return user;

      // return await newUser.save();
    } catch (error) {
      if( error.code === 11000 ){
        throw new BadRequestException(`${ CreateUserDto.email } already exists!` )
      }
      throw new InternalServerErrorException('Something terrible happened!!!')
    }

    //Los 4 elementos fundamentales
    //TODO 1 - Encriptar la contraseña
    
    //TODO 2 - Guardar el usurio
    
    //TODO 3 - Generar el JWT

    //Todo 4 - Manejo de errores
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
