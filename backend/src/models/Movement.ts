import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

/**
 * Movimientos de animales: nacimiento, muerte, venta, compra
 */
@Entity()
export class Movement {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  tipo!: "nacimiento" | "muerte" | "venta" | "compra";

  @Column()
  especie!: string;

  @Column({ type: "integer", default: 0 })
  cantidad!: number;

  @Column({ type: "text", nullable: true })
  notas?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date;
}