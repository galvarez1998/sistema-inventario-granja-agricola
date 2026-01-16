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
  @Column({ nullable: true })
  procedencia?: string; // cerdo, pollo, pez

  @Column({ type: "float", nullable: true })
  peso?: number | null;

  @Column({ type: "date", nullable: true })
  fechaSacrificio?: string | null;

  @Column({ type: "date", nullable: true })
  fechaCaducidad?: string | null;

  // huevos
  @Column({ type: "int", nullable: true })
  cantidadHuevos?: number | null;

  @Column({ type: "date", nullable: true })
  fechaRecoleccion?: string | null;

  @Column({ nullable: true })
  lote?: string | null;

  // miel
  @Column({ nullable: true })
  colmenaOrigen?: string | null;

  @Column({ type: "float", nullable: true })
  cantidadMiel?: number | null;

  @Column({ type: "date", nullable: true })
  fechaExtraccion?: string | null;

  @Column({ nullable: true })
  pureza?: string | null;

  @Column({ type: "text", nullable: true })
  observaciones?: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}