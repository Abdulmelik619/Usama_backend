import { Body, Controller, Inject, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { studentDto } from './student.dto';
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService, ) {}

    @Post('getStudent')
  async getUser(@Body() email: {email: string}){
    return this.studentService.findByemail(email)
  }

  @Post('getStudentbyclass')
  async getUserbyclassId(@Body() classId: {classId: string}){
    return this.studentService.findByclassId(classId)
  }

  @Post('getAbscentsbyId')
  async getAbscentsbyId(@Body() studentId: {studentId: string}){
    return this.studentService.findAbscentsById(studentId)
  }

  @Post('getScorebyId')
  async getScorebyId(@Body() studentId: {studentId: string}){
    return this.studentService.findScoreById(studentId)
  }







  @Post('getallstudents')
  async getallstudents(){
    return this.studentService.getallstudents()
  }

  @Post('getallclasses')
  async getallclasses(){
    return this.studentService.getallclasses()
  }

  @Post('updateProfile')
  async updateProfile(@Body() dto: studentDto){
    return this.studentService.updateProfile(dto)
  }
  @Post('updateClass')
  async updateClass(@Body() data: {classId: string, className: string, dateCreated: string, assignedTeacherId: string}){
    return this.studentService.updateClass(data)
  }


  @Post('createclass')
  async createClass(@Body() data: {className: string, dateCreated: string, assignedTeacherId: string}){
    return this.studentService.addclass(data)
  }

  @Post('addabscent')
  async addAbscent(@Body() data: {student_id: string, class_id: string, date: number}){
    return this.studentService.addabscent(data)
  }

  @Post('addmark')
  async addmark(@Body() data: {
    student_id: string, 
    date: number, 
    score: number, 
    end_ayah: number, 
    end_surah: string
  }){
    return this.studentService.addmark(data)
  }


  @Post('deleteProfile')
  async deleteProfile(@Body() data: {email: string, password: string}) {
    return this.studentService.deleteProfile(data)
  }

  @Post('deletestudent')
  async deletestudentbyemail(@Body() data: {email: string,}) {
    return this.studentService.deletestudent(data)
  }

  @Post('deleteclass')
  async deleteclassbyId(@Body() data: {className: string,}) {
    return this.studentService.deleteclass(data)
  }

  @Post('deleteMark')
  async deleteMark( @Body() data: {studentId: string, date: number}) {
    console.log(typeof data.date);
    return this.studentService.deletemark(data)
  }

  @Post('deleteAbscent')
  async deleteAbscent( @Body() data: {studentId: string, date: number}) {
    return this.studentService.deleteabscent(data)
  }

}
