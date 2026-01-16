import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsIn, IsDateString } from "class-validator";

export class CreateProductionDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["huevos", "miel", "peso"])
  tipo!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsOptional()
  @IsInt()
  cantidadHuevos?: number;

  @IsOptional()
  @IsNumber()
  cantidadMiel?: number;

  @IsOptional()
  @IsNumber()
  gananciaPeso?: number;

  @IsOptional()
  @IsString()
  referencia?: string;
}
