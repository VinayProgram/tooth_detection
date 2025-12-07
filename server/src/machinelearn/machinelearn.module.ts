import { Module } from '@nestjs/common';
import { MachinelearnService } from './machinelearn.service';
import { MachinelearnController } from './machinelearn.controller';

@Module({
  controllers: [MachinelearnController],
  providers: [MachinelearnService],
})
export class MachinelearnModule {}
