import { Injectable } from '@nestjs/common';
import { AnthropicService } from '../common/anthropic.service';
import { ScrapingService } from '../common/scariping.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RiskAssessmentService {
  constructor(
    private readonly anthropicService: AnthropicService,
    private readonly scrapingService: ScrapingService,
    private readonly prisma: PrismaService,
  ) {}

  async assessRisk(input: string): Promise<any> {
    console.log('Received input:', input);

    // 1. Проверяем наличие записи в базе данных
    const cache = await this.prisma.riskAssessmentCache.findUnique({
      where: { input },
    });
    if (cache) {
      return cache.result;
    }

    // 2. Получаем данные через скрапинг
    const scrapedData = await this.scrapingService.scrapeData(input);

    // 3. Формируем промпт для LLM
    const prompt = `
Проанализируй следующие данные для оценки рисков крипто токена:
${JSON.stringify(scrapedData, null, 2)}
Выдай оценку рисков по категориям:
- scamRisk: риск мошенничества
- investorRisk: риск, связанный с количеством предыдущих вкладчиков
- amlRisk: риск, связанный с нарушениями AML

Значения должны быть числами от 1 до 100, в формате JSON, например:
{
  "scamRisk": 75,
  "investorRisk": 40,
  "amlRisk": 60
}
    `;

    // 4. Получаем ответ от LLM (Anthropic)
    const llmResponse = await this.anthropicService.getRiskAssessment(prompt);
    let riskScores;
    try {
      riskScores = JSON.parse(llmResponse);
    } catch (error) {
      throw new Error('Ошибка при разборе ответа LLM для оценки рисков');
    }

    // 5. Сохраняем результат в базе для последующего использования
    await this.prisma.riskAssessmentCache.create({
      data: {
        input,
        result: riskScores,
      },
    });

    return riskScores;
  }
}
