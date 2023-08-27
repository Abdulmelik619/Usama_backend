import { Module } from '@nestjs/common';
import { UsatzController } from './usatz.controller';
import { UsatzService } from './usatz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ustazSchema } from './ustaz.model';
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'ustaz',
      schema: ustazSchema
    }]),
  ],
  controllers: [UsatzController],
  providers: [UsatzService],
  exports: [UsatzService],
})
export class UsatzModule {}
