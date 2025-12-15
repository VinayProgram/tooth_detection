import { Injectable } from '@nestjs/common';
import { YoloService } from 'src/core/machine-learn-core/machine-learn.service';

@Injectable()
export class MachineLearnService {
  constructor(
    private readonly yoloservice:YoloService
  ){}
  async create(path:string) {
    return await this.yoloservice.runYOLO(path)
  }

}
