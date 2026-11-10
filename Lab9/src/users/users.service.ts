import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  constructor() {
    // Seed initial users for testing: an admin and a normal user
    const adminHash = bcrypt.hashSync('Admin1234', 10);
    const userHash = bcrypt.hashSync('User1234', 10);

    this.users.push({
      id: this.idCounter++,
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminHash,
      role: 'admin',
    });

    this.users.push({
      id: this.idCounter++,
      name: 'Normal User',
      email: 'user@example.com',
      passwordHash: userHash,
      role: 'user',
    });
  }

  create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: 'user' | 'admin';
  }): User {
    const newUser: User = {
      id: this.idCounter++,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role || 'user',
    };
    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findAll(): User[] {
    return this.users;
  }

  updatePassword(id: number, newHash: string): void {
    const user = this.findById(id);
    if (user) {
      user.passwordHash = newHash;
    }
  }
}
