import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, OneToMany } from 'typeorm';
import { Favourite } from '../../favourites/favourites.entity';
import * as bcrypt from 'bcryptjs';

const bcryptComparePromise = (password, hash):Promise<boolean> => (
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, success) => {
      err ? reject(err) : resolve(success);
    })
  })
);

const bcryptHashPromise = (password, saltSteps = 10):Promise<string> => (
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltSteps, (err, hash) => {
      err ?  reject(err) : resolve(hash);
    })
  })
)


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Favourite, (favourite:Favourite) => favourite.user)
  favourites: Favourite[];

  // Methods
  async comparePasswords(password): Promise<boolean> {
    return await bcryptComparePromise(password, this.password);
  }

  // Triggers

  @BeforeInsert()
  async passwordHashing() {
    this.password = await bcryptHashPromise(this.password);
  }
}