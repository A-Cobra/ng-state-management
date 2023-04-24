import {
  UseGuards,
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ClassificationService } from '../services/classification.service';
import { BusinessClassificationDto } from '../dto/business-classification.dto';
import { classificationSearchDto } from '../dto/classification-search.dto';

@ApiTags('Classifications')
@UseGuards(JwtAuthGuard)
@Controller('classifications')
export class BusinessClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  async createClassification(@Body() dto: BusinessClassificationDto) {
    return this.classificationService.create(dto);
  }

  @Put(':businessClassificationId')
  async modify(
    @Body() dto: BusinessClassificationDto,
    @Param('businessClassificationId') id: string
  ) {
    return this.classificationService.modify(id, dto);
  }

  @Delete(':businessClassificationId')
  async delete(@Param('businessClassificationId') id: string) {
    return this.classificationService.delete(id);
  }

  @Get()
  async findAll(@Query() dto: classificationSearchDto) {
    return this.classificationService.get(dto);
  }
}
