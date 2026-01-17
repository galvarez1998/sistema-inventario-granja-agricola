import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateHiveDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  ultimaProduccionLitros!: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}

export class UpdateHiveDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  ultimaProduccionLitros?: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
