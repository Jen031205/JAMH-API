import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @IsString({ message: 'nombre debe ser string' })
    @IsOptional()
    @MaxLength(100)
    @MinLength(3)
    @ApiProperty({ description: 'Name', example: 'Tarea Actualizada', required: false })
    name?: string;

    @IsString({ message: 'descripción debe ser string' })
    @IsOptional()
    @MaxLength(250)
    @MinLength(3)
    @ApiProperty({ description: 'Description', example: 'Descripción actualizada', required: false })
    description?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: 'Priority', example: false, required: false })
    priority?: boolean;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: 'User ID', example: 1, required: false })
    user_id?: number;
}
