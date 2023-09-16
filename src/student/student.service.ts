import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.model';
import { studentDto } from './student.dto';
import * as bcrypt from 'bcrypt';
import { Class } from './class.model';
import { Abscent } from './abscent.model';
import { Mark } from './mark.model';
import { Admin } from './admin.model';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel('student') private student: Model<Student>,
        @InjectModel('class') private Class: Model<Class>,
        @InjectModel('abscent') private abcsent: Model<Abscent>,
        @InjectModel('mark') private mark: Model<Mark>,
        @InjectModel('admin') private admin: Model<Admin>,

        ) {}

      async addStudent(dto: studentDto) {
        const student = new this.student({
          fullName: dto.fullName,
          email: dto.email,
          country: dto.country,
          sex: dto.sex,
          kirat_type: dto.Kirat_type,
          surah_name: dto.Surah_name,
          ayah_number: dto.ayah_number,
          hash: dto.password,
          role: dto.role,
          classId: dto.classId,
          isSaved: dto.isSaved,
          isPresent: dto.isPresent,
          avatarUrl: dto.avatarUrl
        });
        const result = await student.save();
        return result;
      }

      async addadmin(email, password, role) {
        const admin = new this.admin({
        
          email: email,
          
          hash: password,
          role: role,
          
        });
        const result = await admin.save();
        return result;
      }

      async addclass(data){
        const Class = new this.Class({
          className: data.className,
          dateCreated: data.dateCreated,
          assignedTeacherId: data.assignedTeacherId
        })

        const result = await Class.save();
        return result;
      }

      private getDayName(date: Date): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay();
        return days[dayIndex];
      }
    
      private getMonthName(date: Date): string {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIndex = date.getMonth();
        return months[monthIndex];
      }

      async addabscent(data){
        
        const date = new Date();
    
    // Get the day name (e.g., Monday, Tuesday)
    const dayName = this.getDayName(date);

    // Get the month name (e.g., January, February)
    const monthName = this.getMonthName(date);

    // Get the year (e.g., 2023)
    const year = date.getFullYear();

   const  datee = `${dayName}, ${monthName} ${year}`;

        const abscent = new this.abcsent({
          student_id: data.student_id,
          class_id: data.class_id,
          date: datee
        })

        const result = await abscent.save();
        return result;
      }


      async addmark(data){
        const date = new Date();
    
        // Get the day name (e.g., Monday, Tuesday)
        const dayName = this.getDayName(date);
    
        // Get the month name (e.g., January, February)
        const monthName = this.getMonthName(date);
    
        // Get the year (e.g., 2023)
        const year = date.getFullYear();
    
       const  datee = `${dayName}, ${monthName} ${year}`;
    
        const mark = new this.mark({
          student_id: data.student_id,
          date: datee,
          score: data.score,
          end_ayah: data.end_ayah,
          end_surah: data.end_surah,
        })

        const result = await mark.save();
        return result;
      }

      async findByemail(info: { email: string }): Promise<Student | undefined> {
        return await this.student.findOne({ email: info.email });
      }
      async findadminByemail(info: { email: string }): Promise<Admin | undefined> {
        return await this.admin.findOne({ email: info.email });
      }

      async findmark(info: { studentId: string, date: string}): Promise<Mark | undefined> {
        console.log(info);
        const mark = await this.mark.findOne({ student_id: info.studentId, date: info.date });
        console.log(mark);
        return mark;
      }

      async findabsent(info: { studentId: string, date: string}): Promise<Abscent | undefined> {
      const mabsent = await this.abcsent.findOne({ student_id: info.studentId, date: info.date });
      console.log(mabsent);  
      return mabsent;
    }

      async findByclassId(info: { classId: string }): Promise<Student[] | undefined> {
        return await this.student.find({ classId: info.classId });
      }


      async findAbscentsById(info: { studentId: string }): Promise<Abscent[] | undefined> {
        return await this.abcsent.find({ student_id: info.studentId });
      }

      async findScoreById(info: { studentId: string }): Promise<Mark[] | undefined> {
        return await this.mark.find({ student_id: info.studentId });
      }

      async getallstudents(): Promise<Student[] | undefined> {
        return await this.student.find();
      }

      async getallclasses(): Promise<Class[] | undefined> {
        return await this.Class.find();
      }

      async updateProfile(dto: studentDto) {
        console.log(dto.avatarUrl);
        if(dto.newemail != null && dto.newemail != ""){
          const hashed = await this.hashData(dto.newpassword);
        dto.newpassword = hashed;
        const updatedProfile = await this.student.findOneAndUpdate(
          { email: dto.email },
          {
            email: dto.newemail,
            hash: dto.newpassword,
            fullName: dto.fullName,
            country: dto.country,
            sex: dto.sex,
            kirat_type: dto.Kirat_type,
            surah_name: dto.Surah_name,
            ayah_number: dto.ayah_number,
            isSaved: dto.isSaved,
            isPresent: dto.isPresent,
            classId: dto.classId, 
            avatarUrl: dto.avatarUrl

          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
        }
        const updatedProfile = await this.student.findOneAndUpdate(
          { email: dto.email },
          {
            fullName: dto.fullName,
            country: dto.country,
            sex: dto.sex,
            kirat_type: dto.Kirat_type,
            surah_name: dto.Surah_name,
            ayah_number: dto.ayah_number,
            isSaved: dto.isSaved,
            isPresent: dto.isPresent,
            classId: dto.classId,
            avatarUrl: dto.avatarUrl
          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
      }

      async updateProfilebackend(student: Student) { 
        const updatedProfile = await this.student.findOneAndUpdate(
          { email: student.email },
          {
            
            isSaved: student.isSaved,
            isPresent: student.isPresent,
          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
      }

      async updateClass(data) {
      console.log(data.className);
      console.log(data.classId);

        const updatedProfile = await this.Class.findOneAndUpdate(
          { className: data.className },
          {
            className: data.classId,
           
            
          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
      }


      

      hashData(data: string) {
        return bcrypt.hash(data, 10);
      }



      async deleteProfile(data: { email: string; password: string }) {
        const student = await this.findByemail({ email: data.email });
        const hash = await this.hashData(data.password);
        if (hash === student.hash) {
          this.student.deleteOne({email: data.email})
          return "successful"
        }else {
          return "incorrect password"
        }
      }

      async deletestudent(data: { email: string; }) {
        
         return await  this.student.deleteOne({email: data.email})
        
      }

      async deleteclass(data: { className: string; }) {
        
        
        return await  this.Class.deleteOne({className: data.className})
       
     }


      async deletemark(data: { studentId: string; date: number }) {
        
        const date = new Date();
    
    // Get the day name (e.g., Monday, Tuesday)
    const dayName = this.getDayName(date);

    // Get the month name (e.g., January, February)
    const monthName = this.getMonthName(date);

    // Get the year (e.g., 2023)
    const year = date.getFullYear();

   const  datee = `${dayName}, ${monthName} ${year}`;
   const customData = {
    studentId: data.studentId,
    date: datee
    // Add any additional properties you need
  }; 

   const mark = await this.findmark(customData)
        console.log(mark);
        if (mark) {
         await this.mark.deleteOne({ student_id: data.studentId, date: datee })
          console.log("Successfull");
          return "successful"
        }else {

          return "incorrect password" 
        }
      }

      async deleteabscent(data: { studentId: string; date: number }) {

        const date = new Date();
    
        // Get the day name (e.g., Monday, Tuesday)
        const dayName = this.getDayName(date);
    
        // Get the month name (e.g., January, February)
        const monthName = this.getMonthName(date);
    
        // Get the year (e.g., 2023)
        const year = date.getFullYear();
    
       const  datee = `${dayName}, ${monthName} ${year}`;

       const customData = {
        studentId: data.studentId,
        date: datee
        // Add any additional properties you need
      };        
        const abscent = await this.findabsent(customData)

        console.log(abscent);
        if (abscent) {
          await this.abcsent.deleteOne({ student_id: data.studentId, date: datee })
          console.log("REakky");
          return "successful"
        }else {
          return "incorrect password"
        }
      }


      async updateStudent(studentId: string, arg1: { hashedRt: any }) {
        console.log(studentId, arg1.hashedRt);
        const doc = await this.student.findByIdAndUpdate(studentId, {
          hashedRt: arg1.hashedRt,
        });
        if (!doc) {
          throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        } else {
          console.log('Updated document: ', doc);
        }
        return true;
      }

      async updateAdmin(adminId: string, arg1: { hashedRt: any }) {
        console.log(adminId, arg1.hashedRt);
        const doc = await this.admin.findByIdAndUpdate(adminId, {
          hashedRt: arg1.hashedRt,
        });
        if (!doc) {
          throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        } else {
          console.log('Updated document: ', doc);
        }
        return true;
      }
    
}
