import { IsString, IsNotEmpty, IsOptional, IsInt, IsIn, IsDateString } from "class-validator";

export class CreateMovementDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["nacimiento", "muerte", "venta", "compra"])
  tipo!: string;

  @IsString()
  @IsNotEmpty()
  especie!: string;

  @IsInt()
  @IsNotEmpty()
  cantidad!: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsDateString()
  fecha?: string;
}
