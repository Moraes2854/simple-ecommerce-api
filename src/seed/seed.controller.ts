import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { envs } from '../config/envs';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async executeSeed(){
    if ( envs.seedExecuted ) throw new Error(`Seed already executed`);
    await this.seedService.execute();
    return true;
  }
}
