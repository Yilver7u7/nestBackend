import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

//Es el Schema de la tabla
@Schema()
export class User {

    //De esta forma nos aseguramos de decirle que va a poder guardar
    //Objetos que luzcan de la siguiente manera en la base de datos
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({required: true})
    name: string;
    
    @Prop({minlength:6, required: true})
    password: string;
    
    @Prop({ default: true,})
    isActive: boolean;
    
    @Prop({ type: [String], default: ['user'] })// ['user','admin',]
    roles: String[];

    //Convertimos cada una en las propiedades de la tabla mediante
    //El decorador Prop
}

//Concluimos la definicion de nuestro Schema, lo definimos en el module
export const UserSchema = SchemaFactory.createForClass(User);