import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "src/users/users.entity";

@Entity('contact')
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20 })
    relation: string;

    @Column('varchar', { length: 20 })
    phone: string;

    @ManyToOne(type => Users, user => user.contacts, { eager: false})
    user: Users;

}