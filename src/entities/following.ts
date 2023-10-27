import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn,
 } from "typeorm";
import { User } from "./user";

@Entity({ name: "follows" })
export class Following {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.following, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "following_id" })
    user: User;

    @ManyToOne(() => User, (user) => user.following, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "follower_id" })
    userd: User

    @CreateDateColumn({ type: "timestamp with time zone"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;
    
}
