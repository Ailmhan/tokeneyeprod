import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AnthropicService {
  private readonly anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Отправляет запрос в Anthropic API для получения оценки рисков.
   * @param prompt Текст запроса, сформированный на основе данных о токене.
   * @returns Сгенерированный ответ от модели Anthropic.
   */
  async getRiskAssessment(prompt: string): Promise<string> {
    try {
      const msg = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022', // замените, если требуется другая модель
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      console.log('Anthropic response:', JSON.stringify(msg, null, 2));

      // Попытка извлечь результат из полей "completion" или "text"
      const result = (msg as any).completion || (msg as any).text || JSON.stringify(msg);
      return result;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error('Ошибка вызова Anthropic API:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.error('Ошибка вызова Anthropic API:', error.message);
      }
      throw new Error('Не удалось получить ответ от Anthropic API');
    }
  }
}
