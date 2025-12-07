import { Module } from '@nestjs/common';
import { MachinelearnModule } from './machinelearn/machinelearn.module';

@Module({
  imports: [MachinelearnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
