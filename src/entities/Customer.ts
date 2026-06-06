import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";

export type CustomerProduct =
    | "Cuenta de Ahorros"
    | "Cuenta Corriente"
    | "Tarjeta de Credito"
    | "Credito Libre Inversion"
    | "Credito de Vehiculo"
    | "Credito Rotativo";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, length: 10 })
    identification!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: "int" })
    age!: number;

    @Column({ length: 120 })
    email!: string;

    @Column({ length: 40 })
    product!: CustomerProduct;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
}