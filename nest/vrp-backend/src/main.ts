/* eslint-disable prettier/prettier */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <--- Import ini

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 WAJIB: Aktifkan ValidationPipe secara Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // Hapus properti yang tidak ada di DTO
      forbidNonWhitelisted: true,    // Tolak request jika ada field asing
      transform: true,               // Otomatis ubah tipe data sesuai DTO
    }),
  );

  // Jangan lupa aktifkan CORS agar React Native bisa akses API ini
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();