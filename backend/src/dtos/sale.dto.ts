import { IsString, IsNotEmpty, IsNumber, IsInt, IsIn, IsOptional, IsDateString, IsUUID } from "class-validator";

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["producto", "animal"])
  tipo!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  referenciaId!: string;

  @IsNumber()
  @IsNotEmpty()
  precioTotal!: number;

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
