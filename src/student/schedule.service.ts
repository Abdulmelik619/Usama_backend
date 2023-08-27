import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StudentService } from './student.service';
import { studentDto } from './student.dto';

@Injectable()
export class DailyTaskService {
  constructor(private readonly studentService: StudentService) {}

  @Cron('1 0 * * *') 
  async runDailyTask() {
    const students = await this.studentService.getallstudents();
    for (const student of students) {
      student.isPresent = false;
      student.isSaved = false;
         
      await this.studentService.updateProfilebackend(student );
    }
  }
}