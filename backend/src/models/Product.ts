import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Productos: carne, huevos, miel
 */
@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  tipo!: "carne" | "huevo" | "miel";

  // carne fields
  @Column({ type: "varchar", nullable: true })
  procedencia?: string; // cerdo, pollo, pez

  @Column({ type: "real", nullable: true })
  peso?: number | null;

  @Column({ type: "varchar", nullable: true })
  fechaSacrificio?: string | null;

  @Column({ type: "varchar", nullable: true })
  fechaCaducidad?: string | null;

  // huevos
  @Column({ type: "integer", nullable: true })
  cantidadHuevos?: number | null;

  @Column({ type: "varchar", nullable: true })
  fechaRecoleccion?: string | null;

  @Column({ type: "varchar", nullable: true })
  lote?: string | null;

  // miel
  @Column({ type: "varchar", nullable: true })
  colmenaOrigen?: string | null;

  @Column({ type: "real", nullable: true })
  cantidadMiel?: number | null;

  @Column({ type: "varchar", nullable: true })
  fechaExtraccion?: string | null;

  @Column({ type: "varchar", nullable: true })
  pureza?: string | null;

  @Column({ type: "text", nullable: true })
  observaciones?: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}