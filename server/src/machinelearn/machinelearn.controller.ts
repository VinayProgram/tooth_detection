import { Controller } from '@nestjs/common';
import { MachinelearnService } from './machinelearn.service';

@Controller('machinelearn')
export class MachinelearnController {
  constructor(private readonly machinelearnService: MachinelearnService) {}
}
