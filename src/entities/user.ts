import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, CreateDateColumn, 
    UpdateDateColumn,
    OneToMany,
    JoinColumn 
} from "typeorm"
import { Thread } from "./thread"
import { Like } from "./like";
import { Reply } from "./reply";
import { Following } from "./following";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    profile_picture: string;

    @Column({ nullable: true })
    profile_description: string;

    @CreateDateColumn({ type: "timestamp with time zone"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;

    @OneToMany(() => Thread, (thread) => thread.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    threads: Thread[]

    @OneToMany(() => Like, likes => likes.id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    likes: Like[]

    @OneToMany(() => Reply, (replies) => replies.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    replies: Reply[];

    @OneToMany(() => Following, (follows) => follows.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    following: Following[];

    @OneToMany(() => Following, (follows) => follows.userd, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    follower: Following[];

}