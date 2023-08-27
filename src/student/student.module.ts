import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { studentSchema } from './student.model';
import { MongooseModule } from '@nestjs/mongoose';
import { classSchema } from './class.model';
import { abscentSchema } from './abscent.model';
import { markSchema } from './mark.model';
import { adminSchema } from './admin.model';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'student',
      schema: studentSchema
    }]),
    MongooseModule.forFeature([{
      name: 'class',
      schema: classSchema
    }]),
    MongooseModule.forFeature([{
      name: 'abscent',
      schema: abscentSchema
    }]),
    MongooseModule.forFeature([{
      name: 'mark',
      schema: markSchema
    }]),
    MongooseModule.forFeature([{
      name: 'admin',
      schema: adminSchema
    }]),
    // WebSocketModule,
  ],
  providers: [StudentService, ],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
