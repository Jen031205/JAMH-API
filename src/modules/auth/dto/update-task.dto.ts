import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateTaskDto {


    @IsString({ message: 'nombre es requerido' })
    @IsOptional()
    @MaxLength(100)
    @MinLength(3)
    name?: string;


    @IsString({ message: 'nombre es requerido' })
    @IsOptional()
    @MaxLength(250)
    @MinLength(3)
    description?: string;


    @IsBoolean()
    @IsOptional()
    priority?: boolean;

    @IsNumber()
    @IsInt()
    user_id?: number;

}