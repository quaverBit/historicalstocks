import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user/user.entity';


@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @ManyToOne(type => User, (user:User) => user.favourites)
  user: User;

  @Column({ type: 'int', nullable: true})
  userId: number | null;
}