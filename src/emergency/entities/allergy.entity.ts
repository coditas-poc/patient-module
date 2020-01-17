import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "src/users/users.entity";

@Entity('allergy')
export class Allergy extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20 })
    level: string;

    @ManyToOne(type => Users, user => user.allergies, { eager: false})
    user: Users;

}