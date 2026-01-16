import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Colmena (Abejas)
 */
@Entity()
export class Hive {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nombre!: string;

  @Column({ type: "float", default: 0 })
  ultimaProduccionLitros!: number;

  @Column({ type: "text", nullable: true })
  ubicacion?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}