import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsIn, IsDateString } from "class-validator";

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  especie!: string;

  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;

  @IsOptional()
  @IsString()
  edad?: string;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsIn(["saludable", "enfermo", "vendido", "muerto"])
  estado?: string;

  @IsOptional()
  @IsInt()
  cantidad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateAnimalDto {
  @IsOptional()
  @IsString()
  especie?: string;

  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;

  @IsOptional()
  @IsString()
  edad?: string;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsIn(["saludable", "enfermo", "vendido", "muerto"])
  estado?: string;

  @IsOptional()
  @IsInt()
  cantidad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
