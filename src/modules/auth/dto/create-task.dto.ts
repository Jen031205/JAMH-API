import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {

    @IsNotEmpty()
    @IsString({ message: 'nombre es requerido' })
    @MaxLength(100)
    @MinLength(3)
    @ApiProperty({ description: 'Name', example: 'Jen' })
    name: string;

    @IsNotEmpty()
    @IsString({ message: 'nombre es requerido' })
    @MaxLength(250)
    @MinLength(3)
    @ApiProperty({ description: 'Description', example: 'Tarea de ejemplo' })
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: 'Priority', example: true })
    priority: boolean;

    @IsNumber()
    @IsInt()
    @ApiProperty({ description: 'User ID', example: 1 })
    user_id: number;
}