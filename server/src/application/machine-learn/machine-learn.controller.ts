import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MachineLearnService } from './machine-learn.service';

@Controller('machine-learn')
export class MachineLearnController {
  constructor(private readonly machineLearnService: MachineLearnService) {}

  @Post()
  async create() {
    return await this.machineLearnService.create();
  }

  
}
