import { Module } from '@nestjs/common';
import { MachineLearnService } from './machine-learn.service';
import { MachineLearnController } from './machine-learn.controller';
import { YoloService } from 'src/core/machine-learn-core/machine-learn.service';

@Module({
  controllers: [MachineLearnController],
  providers: [MachineLearnService,YoloService],
})
export class MachineLearnModule {}
