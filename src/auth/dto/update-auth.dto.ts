import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-userdto';

export class UpdateAuthDto extends PartialType(CreateUserDto) {}
