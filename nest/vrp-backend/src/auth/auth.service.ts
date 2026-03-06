/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';
import {LoginUserDto} from './dto/login.dto'
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma,Role } from '@prisma/client';

export interface LoginResponse {
  access_token: string;
  role: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly jwtService: JwtService) {}

  async registerUser(data: RegisterUserDto): Promise<string> {
    const { username, password, role } = data;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role: role as Role,
        },
      });

      return 'User registered successfully!';
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Username sudah terpakai!');
        }
      }
      console.error(error); 
      throw new InternalServerErrorException('Gagal mendaftar user');
    }
  }

  async login(data: LoginUserDto) : Promise<LoginResponse>{
    const { username, password } = data;

    // 1. Cari User di Database
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    // 2. Cek apakah user ada?
    if (!user) {
      throw new UnauthorizedException('Username tidak terdaftar');
    }

    // 3. Cek Password (Bandingkan input vs Hash di DB)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah!');
    }

    // 4. Bikin Payload (Isi Token)
    const payload = { 
      sub: user.id,        // ID User
      username: user.username, 
      role: user.role      // Penting buat frontend tau dia Admin/Kurir
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = await this.jwtService.signAsync(payload) as string;
    // 5. Return Token
    return {
      access_token: token,
      role: user.role,
      username: user.username,
    };
  }
}