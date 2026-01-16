import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

/**
 * Animal entity: cerdos, gallinas, pollos, peces, abejas (colmenas)
 */
@Entity()
export class Animal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  especie!: string; // ej: cerdo, gallina, pollo, pez, colmena

  @Column({ type: "varchar", nullable: true })
  fechaIngreso!: string | null;

  @Column({ type: "varchar", nullable: true })
  edad!: string | null;

  @Column({ type: "real", nullable: true })
  peso!: number | null;

  @Column({ default: "saludable" })
  estado!: "saludable" | "enfermo" | "vendido" | "muerto";

  @Column({ type: "integer", default: 1 })
  cantidad!: number;

  @Column({ type: "text", nullable: true })
  observaciones?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}