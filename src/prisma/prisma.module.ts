import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // чтобы сервис был доступен во всем приложении
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
