import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'name', 'email'],
    });
  }

  async create(user: User): Promise<User> {
    // This should be at Model, but typeOrm was not firing @BeforeInsert
    return await this.userRepository.save(this.userRepository.create(user));
  }

}
