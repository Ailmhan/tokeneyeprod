import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RiskAssessmentModule } from './risk-assessment/risk-assessment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RiskAssessmentModule,
  ],
})
export class AppModule {}
