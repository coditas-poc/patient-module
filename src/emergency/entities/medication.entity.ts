import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "src/users/users.entity";

@Entity('medication')
export class Medication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20 })
    dosage: string;

    @Column('varchar',{ length: 20 })
    time: string;

    @ManyToOne(type => Users, user => user.medications, { eager: false})
    user: Users;

}