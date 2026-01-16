import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Animal entity: cerdos, gallinas, pollos, peces, abejas (colmenas)
 */
@Entity()
export class Animal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  especie!: string; // ej: cerdo, gallina, pollo, pez, colmena

  @Column({ type: "date", nullable: true })
  fechaIngreso!: string | null;

  @Column({ nullable: true })
  edad!: string | null;

  @Column({ type: "float", nullable: true })
  peso!: number | null;

  @Column({ default: "saludable" })
  estado!: "saludable" | "enfermo" | "vendido" | "muerto";

  @Column({ type: "int", default: 1 })
  cantidad!: number;

  @Column({ type: "text", nullable: true })
  observaciones?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}