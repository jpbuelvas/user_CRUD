import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length:30,nullable: false})
    firstName: string;

    @Column({type: 'varchar', length:30, nullable: true})
    secondName!: string;

    @Column({type: 'varchar', length:30, nullable: false})
    lastName: string;

    @Column({type: 'varchar', length:30, nullable: true})
    secondLast!: string;

    @Column({type: 'varchar', length:30, unique: true})
    email: string;

    @Column({type: 'float', default: 0})
    balance!: number;

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

    @DeleteDateColumn()
    deleteDate!: Date;

    constructor(firstName: string, lastName: string,email:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email=email;

    }
}