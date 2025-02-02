import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RiskAssessmentService } from './risk-assessment.service';
import { RiskAssessmentDto } from 'dto/risk-assessment.dto';

@Controller('risk')
export class RiskAssessmentController {
  constructor(private readonly riskAssessmentService: RiskAssessmentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async assessRisk(@Body() dto: RiskAssessmentDto) {
    return await this.riskAssessmentService.assessRisk(dto.input);
  }
}
