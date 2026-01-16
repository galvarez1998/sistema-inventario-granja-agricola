import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsIn, IsDateString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["carne", "huevo", "miel"])
  tipo!: string;

  // carne fields
  @IsOptional()
  @IsString()
  procedencia?: string;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsDateString()
  fechaSacrificio?: string;

  @IsOptional()
  @IsDateString()
  fechaCaducidad?: string;

  // huevos fields
  @IsOptional()
  @IsInt()
  cantidadHuevos?: number;

  @IsOptional()
  @IsDateString()
  fechaRecoleccion?: string;

  @IsOptional()
  @IsString()
  lote?: string;

  // miel fields
  @IsOptional()
  @IsString()
  colmenaOrigen?: string;

  @IsOptional()
  @IsNumber()
  cantidadMiel?: number;

  @IsOptional()
  @IsDateString()
  fechaExtraccion?: string;

  @IsOptional()
  @IsString()
  pureza?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsIn(["carne", "huevo", "miel"])
  tipo?: string;

  @IsOptional()
  @IsString()
  procedencia?: string;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsDateString()
  fechaSacrificio?: string;

  @IsOptional()
  @IsDateString()
  fechaCaducidad?: string;

  @IsOptional()
  @IsInt()
  cantidadHuevos?: number;

  @IsOptional()
  @IsDateString()
  fechaRecoleccion?: string;

  @IsOptional()
  @IsString()
  lote?: string;

  @IsOptional()
  @IsString()
  colmenaOrigen?: string;

  @IsOptional()
  @IsNumber()
  cantidadMiel?: number;

  @IsOptional()
  @IsDateString()
  fechaExtraccion?: string;

  @IsOptional()
  @IsString()
  pureza?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
