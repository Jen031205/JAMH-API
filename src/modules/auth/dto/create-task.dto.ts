export class CreateTaskDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    priority: boolean;
}