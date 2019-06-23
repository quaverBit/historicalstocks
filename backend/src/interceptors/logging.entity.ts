import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Logging {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  url: string;

  @Column()
  method: string;

  @Column()
  time: number;

  @Column({ type: 'int', nullable: true})
  userId: number | null;
}