import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RiskAssessmentService } from './risk-assessment.service';
import { RiskAssessmentDto } from 'dto/risk-assessment.dto';

@ApiTags('Risk Assessment')
@Controller('risk')
export class RiskAssessmentController {
  constructor(private readonly riskAssessmentService: RiskAssessmentService) {}

  @Post()
  @ApiOperation({ summary: 'Оценка рисков крипто токена' })
  @ApiResponse({
    status: 200,
    description: 'Оценка рисков',
    schema: {
    example: {
      scamRisk: 75,
        investorRisk: 40,
        amlRisk: 60,
    },
  }})
  @UsePipes(new ValidationPipe())
  async assessRisk(@Body() dto: RiskAssessmentDto) {
    return await this.riskAssessmentService.assessRisk(dto.input);
  }
}
