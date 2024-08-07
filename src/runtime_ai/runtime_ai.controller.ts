import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { RuntimeAiService } from './runtime_ai.service';

@Controller('runtime-ai')
export class RuntimeAiController {
    constructor(private readonly runtimeAiService: RuntimeAiService) {}

    @Get('/v1')
    runtimeAI(@Query('q') q: string) {
        if (!q) {
            throw new BadRequestException('Tham số q không được để trống!');
        }

        return this.runtimeAiService.runtimeAI(q);
    }
}
