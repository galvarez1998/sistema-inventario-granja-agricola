import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

/**
 * Ventas de productos o animales
 */
@Entity()
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  tipo!: "producto" | "animal";

  @Column()
  referenciaId!: string; // productId o animalId

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precioTotal!: number;

  @Column({ type: "int", default: 1 })
  cantidad!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date;

  @Column({ type: "text", nullable: true })
  notas?: string;

  @CreateDateColumn()
  createdAt!: Date;
}