import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

/**
 * Registros de producción diaria/semanal: huevos recolectados, miel, ganancias en peso
 */
@Entity()
export class Production {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  tipo!: "huevos" | "miel" | "peso"; // peso = ganancia de peso animales

  @Column({ type: "date" })
  fecha!: string;

  @Column({ type: "int", nullable: true })
  cantidadHuevos?: number | null;

  @Column({ type: "float", nullable: true })
  cantidadMiel?: number | null;

  @Column({ type: "float", nullable: true })
  gananciaPeso?: number | null;

  @Column({ type: "text", nullable: true })
  referencia?: string | null; // colmena id, especie, lote, etc.

  @CreateDateColumn()
  createdAt!: Date;
}