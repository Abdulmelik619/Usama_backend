import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsatzModule } from './usatz/usatz.module';
import { DailyTaskService } from './student/schedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, 
    StudentModule,        
    MongooseModule.forRoot('mongodb+srv://Abdulmelik619:jMV6RfKfzpJeVBdF@cluster0.457xzt4.mongodb.net/KuranTutorial?retryWrites=true&w=majority'), 
    UsatzModule, 
    ScheduleModule.forRoot()
],
  controllers: [AppController],
  providers: [AppService, DailyTaskService],
})
export class AppModule {}
