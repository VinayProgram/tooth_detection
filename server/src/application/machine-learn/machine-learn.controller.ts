import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MachineLearnService } from './machine-learn.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';

@Controller('machine-learn')
export class MachineLearnController {
  constructor(private readonly machineLearnService: MachineLearnService) { }
 @UseInterceptors(FileInterceptor('file', {
  storage:diskStorage({
      destination: join(__dirname, '../../..', 'public'),
      filename: (req, file, cb) => {
        const unique =
          Date.now() +
          '-' +
          Math.random().toString(36).slice(2);

        const safeOriginal = file.originalname.replace(/[^\w.-]/g, '_');
        cb(null, `${unique}_${safeOriginal}`);
      },
    })}))
  @Post()
  async create(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return await this.machineLearnService.create(`http://localhost:7541/static/${file.filename}`);
  }


}
