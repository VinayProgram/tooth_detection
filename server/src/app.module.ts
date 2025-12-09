import { Module } from '@nestjs/common';
import { MachineLearnModule } from './application/machine-learn/machine-learn.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files
      serveRoot: '/static', // Optional: Prefix for serving static files
    }),
    MachineLearnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
