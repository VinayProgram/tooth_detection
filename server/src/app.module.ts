import { Module } from '@nestjs/common';
import { MachineLearnModule } from './application/machine-learn/machine-learn.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files
      serveRoot: '/static', // Optional: Prefix for serving static files
    }),
    CacheModule.register({
       isGlobal: true,
    }),
    MulterModule.register({
    dest: join(__dirname, '../../..', 'public'),
    fileFilter: (req, file, callback) => {
      let uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9)+"_"+ file.originalname
      file.filename = uniqueName 
      console.log(file.filename)
      callback(
        null,
        uniqueName as any,
      )
    }
  }),
    MachineLearnModule,
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
