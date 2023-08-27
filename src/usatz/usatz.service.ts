import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ustaz } from './ustaz.model';
import { Console } from 'console';

@Injectable()
export class UsatzService {
    constructor(
        @InjectModel('ustaz') private ustaz: Model<Ustaz>,
      ) {}

      async addUstaz(fullName: string, email: string, password: string, role: string, classId: string, avatarUrl: string) {
        const ustaz  = new this.ustaz({
          fullName: fullName,
          email: email,
          hash: password,
          role: role,
          classId: classId,
          avatar: avatarUrl
        });
        const result = await ustaz.save();
        console.log(result);
        return result;
      }

      async findByemail(info: { email: string }): Promise<Ustaz | undefined> {
        return await this.ustaz.findOne({ email: info.email });
      }

      async updateustaz(ustazId: string, arg1: { hashedRt: any }) {
        console.log(ustazId, arg1.hashedRt);
        
        const doc = await this.ustaz.findByIdAndUpdate(ustazId, {
          hashedRt: arg1.hashedRt,
        });
        if (!doc) {
          throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        } else {
          console.log('Updated document: ', doc);
        }
        console.log("true");
        return true;
      }

      async getallustazs(): Promise<Ustaz[] | undefined> {
        return await this.ustaz.find();
      }
      hashData(data: string) {
        return bcrypt.hash(data, 10);
      }
      async updateustazProfile(fullName: string, email: string, password: string, role: string, classId: string, newemail: string, newpassword: string, avatar: string) {
        if(newemail != null && newemail != ""){
          const hashed = await this.hashData(newpassword);
        newpassword = hashed;
        const updatedProfile = await this.ustaz.findOneAndUpdate(
          { email: email },
          {
            email: newemail,
            hash: newpassword,
            fullName: fullName,
            classId: classId,
            avatar: avatar
          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
        }
        
        
        console.log("update");
        const updatedProfile = await this.ustaz.findOneAndUpdate(
          { email: email },
          {
            fullName: fullName,
            classId: classId,
            avatar: avatar
          },
          { new: true },
        );
        console.log(updatedProfile);
        return updatedProfile;
      }

      async deleteustaz(data: { email: string; }) {
        
        return await  this.ustaz.deleteOne({email: data.email})
       
     }

}
