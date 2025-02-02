import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ScrapingService {
  private readonly tavilyApiKey = process.env.TAVILY_API_KEY;

  async scrapeData(query: string): Promise<any> {
    try {
      // Выполняем POST-запрос к Tavily API
      const response = await axios.post(
        'https://api.tavily.com/search',
        { query }, // тело запроса содержит параметр query
        {
          headers: {
            'Authorization': `Bearer ${this.tavilyApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка вызова Tavily API:', error.response?.data || error.message);
      throw new Error('Не удалось получить данные от Tavily API');
    }
  }
}
