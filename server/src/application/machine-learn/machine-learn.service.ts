import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { YoloService } from 'src/core/machine-learn-core/machine-learn.service';

@Injectable()
export class MachineLearnService {
  constructor(
    private readonly yoloservice:YoloService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){}
  async create(path:string,filename:string) {
    const fileCache =await this.cacheManager.get(filename);

    if(fileCache){
      console.log('cachecd data')
      return fileCache
    }
    const data= await this.yoloservice.runYOLO(path,filename)
    await this.cacheManager.set(filename, data);

  }

}
