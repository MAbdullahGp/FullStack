import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
      role: 'user',
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    // Generic error message for both unknown email and wrong password to prevent user enumeration
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 1. Verify currentPassword with bcrypt.compare. If wrong, throw UnauthorizedException.
    const isCurrentValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // 2. Reject the request with 400 if the new password is the same as the current one.
    const isSamePassword = await bcrypt.compare(dto.newPassword, user.passwordHash);
    if (isSamePassword) {
      throw new BadRequestException('New password cannot be the same as the current password');
    }

    // 3. Hash the new password with bcrypt and save it.
    const newHash = await bcrypt.hash(dto.newPassword, 10);
    this.usersService.updatePassword(userId, newHash);

    // 4. Respond with { "message": "Password updated" }. Never contain a hash.
    return { message: 'Password updated' };
  }
}
