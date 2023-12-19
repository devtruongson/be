import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModelWitService } from './model-wit.service';
import { createModelDTO } from './dto/createModel.dto';

@Controller('model-wit')
export class ModelWitController {
    constructor(private readonly modelWitService: ModelWitService) {}

    @Post()
    createModel(@Body() data: createModelDTO) {
        return this.modelWitService.createModel(data);
    }

    @Get()
    getAllModelWit() {
        return this.modelWitService.getAllModelWit();
    }
}
