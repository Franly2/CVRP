/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  imports: [PrismaModule,JwtModule.register({
      global: true,
      secret: 'RAHASIA_NEGARA_SANGAT_AMAN', // Ganti pake process.env.JWT_SECRET nanti
      signOptions: { expiresIn: '1d' }, // Token valid 1 hari
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
