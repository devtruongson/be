import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TrainingSectorService } from './TrainingSector.Service';
import { createTrainingSector } from './dto/createTrainingSector.dto';
import { createLocation } from './dto/createLocation.dto';

@Controller('app')
export class TrainingSectorController {
    constructor(private readonly trainingSectorService: TrainingSectorService) {}

    @Post('')
    createTrainingSector(@Body() data: createTrainingSector) {
        return this.trainingSectorService.createTrainingSector(data);
    }

    @Post('location')
    createLocation(@Body() data: createLocation) {
        console.log(data);
        return this.trainingSectorService.createLocation(data);
    }

    @Get()
    getAllTrainingSections() {
        return this.trainingSectorService.getAllTrainingSections();
    }

    @Get('/process')
    getProcessingSections(@Query('q') q: string) {
        if (!q) {
            throw new BadRequestException();
        }
        return this.trainingSectorService.getProcessingSections(q);
    }
}
