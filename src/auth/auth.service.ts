import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Encriptdor
import * as bcrypt from 'bcryptjs';


import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfces/jwt-payload';
import { LoginResponse } from './interfces/login-response';
//Importar todos los DTO
import { CreateUserDto, LoginDto, RegisterDto, UpdateAuthDto } from './dto';


@Injectable()
export class AuthService {

  // Inyeccion de dependencia
  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>,
    private jwtService: JwtService,
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

  async register( registerUser: RegisterDto ): Promise<LoginResponse>{

    const user = await this.create(registerUser);

    return{
      user: user,
      token: this.getJwtToken({ id: user._id})

    }

  }


  // Usulmente hacemos la avalida de que se encuentre el usuario en la base de datos
  // Y con base en ello generamos y entregamos su JWT
  async login( loginDto: LoginDto): Promise<LoginResponse>{
    const { email, password } =loginDto;

    const user = await this.userModel.findOne({ email })
    if(!user){
      throw new UnauthorizedException('Not valid credentials - email')
    }

    //Validacion de HASH 
    if( !bcrypt.compareSync( password, user.password ) ){
      throw new UnauthorizedException('Not valid credentials - password')
    }

    const { password:_, ...rest } = user.toJSON();

    return{
      user: rest,
      token: this.getJwtToken( {id: user.id} ),
      // token: 'ABC-123'
    }

  }

  async loginResponseTarea( checkToken: LoginResponse ){
    console.log('fine')
  }

//Nos genera un Token
  getJwtToken( payload: JwtPayload ){
    const token = this.jwtService.sign(payload);
    return token;
  }

  async findUserById( id: string ){
    const user = await this.userModel.findById( id );

    const { password, ...rest } = user.toJSON();
    return rest;
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
