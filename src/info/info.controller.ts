import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InfoService } from './info.service';
import { createInfo } from './dto/createInfo.dto';
import { updateInfoDTO } from './dto/updateInfo.dto';

@Controller('info')
export class InfoController {
    constructor(private readonly infoService: InfoService) {}

    @Post()
    createInfo(@Body() data: createInfo) {
        return this.infoService.createInfo(data);
    }

    @Get()
    getAllInfo() {
        return this.infoService.getAllInfo();
    }

    @Get(`/:id`)
    getDetailInfo(@Param('id') id: string, @Query('is_active') is_active: 'false' | 'true' = 'false') {
        if (is_active !== 'true' && is_active !== 'false') {
            throw new BadRequestException('Tham số is_active không hợp lệ!');
        }
        return this.infoService.getDetailInfo(id, is_active);
    }

    @Put()
    updateInfo(@Body() data:updateInfoDTO) {
        return this.infoService.updateDetailInfo(data);
    }
}
