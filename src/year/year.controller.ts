import { Body, Controller, Get, Post } from '@nestjs/common';
import { YearService } from './year.service';
import { createYearDTO } from './dto/createYear.dto';

@Controller('year')
export class YearController {
    constructor(private readonly yearService: YearService) {}

    @Post()
    createYear(@Body() data: createYearDTO) {
        return this.yearService.createYear(data);
    }

    @Get()
    getAllYear() {
        return this.yearService.getAllYear();
    }
}
