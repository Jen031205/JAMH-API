import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(200)
    @ApiProperty({ description: 'Nombre del usuario', example: 'Juan', required: false })
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez', required: false })
    lastname?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @ApiProperty({ description: 'Nueva contraseña', example: 'newPassword123', required: false })
    password?: string;
}
