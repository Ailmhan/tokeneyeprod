import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RiskAssessmentDto {
  @ApiProperty({
    description: 'Адрес токена или название криптовалюты',
    example: '0xYourTokenAddressOrName',
  })
  @IsString()
  @IsNotEmpty()
  input: string;
}
