import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsEmail()
    @ApiProperty({ description: 'Nombre de usuario único', example: 'juan.perez@example.com' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({ description: 'Contraseña', example: 'securePassword123' })
    password: string;
}
