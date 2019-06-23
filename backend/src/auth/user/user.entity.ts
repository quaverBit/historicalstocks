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

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Favourite, (favourite:Favourite) => favourite.user)
  favourites: Favourite[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // Methods
  async comparePasswords(password): Promise<boolean> {
    return await bcryptComparePromise(password, this.password);
  }

  @BeforeInsert()
  async passwordHashing() {
    this.password = await bcryptHashPromise(this.password);
  }
}