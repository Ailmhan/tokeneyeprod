import { Module } from '@nestjs/common';
import { RiskAssessmentController } from './risk-assessment.controller';
import { RiskAssessmentService } from './risk-assessment.service';
import { AnthropicService } from '../common/anthropic.service';
import { ScrapingService } from '../common/scariping.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RiskAssessmentController],
  providers: [
    RiskAssessmentService,
    AnthropicService,
    ScrapingService,
    PrismaService,
  ],
})
export class RiskAssessmentModule {}
