import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { studentDto } from 'src/student/student.dto';
import { StudentService } from 'src/student/student.service';
import * as bcrypt from 'bcrypt';
import { tokens } from './types/types';
import { loginDto } from './loginDto/login.dto';
import { UsatzService } from 'src/usatz/usatz.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly studentService: StudentService,
        private readonly ustazService: UsatzService,
        private readonly jwtService: JwtService,
        private config: ConfigService,
      ) {}

      hashData(data: string) {
        return bcrypt.hash(data, 10);
      }

      async signUpStudent(dto: studentDto) {
        const query = { email: dto.email};

        const userWithEmail = await this.studentService.findByemail(query);

        if (userWithEmail) {
          console.log(userWithEmail.fullName);
          return [
            HttpStatus.CONFLICT,
           'Email already exists',
        ];
        }
    



        const hashed = await this.hashData(dto.password);
        dto.password = hashed;
        const user = await this.studentService.addStudent(dto);
        const tokens = await this.getTokens(user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        console.log("user");
        return { ...tokens, role: user.role };
      }

      async signUpUstaz(fullName: string, email: string, password: string, role: string, classId: string, avatar: string ) {
        const query = { email: email};
        var object;

        const userWithEmail = await this.ustazService.findByemail(query);

        if (userWithEmail) {
          console.log(userWithEmail.fullName);
          return [
            HttpStatus.CONFLICT,
           'Email already exists',
        ];
        }
        
        const hashed = await this.hashData(password);
        password = hashed;
        const ustaz = await this.ustazService.addUstaz(fullName, email, password, role, classId, avatar);
        const tokens = await this.getTokens(ustaz.email, ustaz.role);
        console.log(tokens);
        await this.ustazupdateRtHash(ustaz.id, tokens.refresh_token);
        console.log(ustaz.role);
        object = { ...tokens, role: ustaz.role };
        console.log(object)
        return ustaz.role;
      }

      async signUpAdmin( email: string, password: string, role: string,) {
        const query = { email: email};
        var object;

        const userWithEmail = await this.ustazService.findByemail(query);

        if (userWithEmail) {
          console.log(userWithEmail.fullName);
          return [
            HttpStatus.CONFLICT,
           'Email already exists',
        ];
        }
        
        const hashed = await this.hashData(password);
        password = hashed;
        const admin = await this.studentService.addadmin( email, password, role, );
        const tokens = await this.getTokens(admin.email, admin.role);
        console.log(tokens);
        await this.adminupdateRtHash(admin.id, tokens.refresh_token);
        console.log(admin.role);
        object = { ...tokens, role: admin.role };
        console.log(object)
        return admin.role;
      }

      async loginStudent(dto: loginDto): Promise<any> {
        const query = { email: dto.email};
        const student = await this.studentService.findByemail(query); 
        const ustaz = await this.ustazService.findByemail(query);
        const admin = await this.studentService.findadminByemail(query);

        if(student){
          const passwordMatches = await bcrypt.compare(dto.password, student.hash);
          if (!passwordMatches)
            throw new HttpException(
              'Password is not correct',
              HttpStatus.FORBIDDEN,
            );
          const tokens = await this.getTokens(student.email, student.role);
          await this.updateRtHash(student.id, tokens.refresh_token);
          return [{ ...tokens, role: student.role }, student];
        }

        else if(ustaz){
          const passwordMatches = await bcrypt.compare(dto.password, ustaz.hash);
          if (!passwordMatches)
            throw new HttpException(
              'Password is not correct',
              HttpStatus.FORBIDDEN,
            );
          const tokens = await this.getTokens(ustaz.email, ustaz.role);
          await this.ustazupdateRtHash(ustaz.id, tokens.refresh_token);
          return [{ ...tokens, role: ustaz.role }, ustaz];
        } else if(admin){
          const passwordMatches = await bcrypt.compare(dto.password, admin.hash);
          if (!passwordMatches)
            throw new HttpException(
              'Password is not correct',
              HttpStatus.FORBIDDEN,
            );
          const tokens = await this.getTokens(admin.email, admin.role);
          await this.adminupdateRtHash(admin.id, tokens.refresh_token);
          return [{ ...tokens, role: admin.role }, admin];
        }
         else {
          throw new HttpException('User not found!', HttpStatus.FORBIDDEN);
        } 
      }

      async logoutUser(email: string) {
        const query = { email: email };
        const user = await this.studentService.findByemail(query);
        await this.updateRtHash(user.id, null);
      }

      async refreshTokens(ref: { email: string; rt: string }) {
        const query = { email: ref.email };
        const student = await this.studentService.findByemail(query);
        // console.log(user)
        // console.log(user.toJSON());
        if (!student) {
          throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
          //console.error(err);
        } else {
          //console.log(user);
          if (!student || !student.hashedRt)
            throw new HttpException('Access Denied!', HttpStatus.FORBIDDEN);
          const rtMatches = await bcrypt.compare(ref.rt, student.hashedRt);
          console.log(rtMatches, ' ');
          if (!rtMatches) {
            throw new HttpException('Access Denied!', HttpStatus.FORBIDDEN);
          } else {
            const tokens = await this.getTokens(student.email, student.role);
            await this.updateRtHash(student.id, tokens.refresh_token);
            return { ...tokens, role: student.role };
          }
        }
      }
    

      async getTokens(
        email: string,
        role: string,
      ): Promise<tokens> {
        const [at, rt] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: email,
              role,
            },
            {
              secret: this.config.get<string>('AT_SECRET'),
              expiresIn: 60 * 15,
            },
          ),
          this.jwtService.signAsync(
            {
              sub: email,
              email,
              role,
            },
            {
              secret: this.config.get<string>('RT_SECRET'),
              expiresIn: 60 * 60 * 24 * 7,
            },
          ),
        ]);
        return {
          access_token: at,
          refresh_token: rt,
        };
      }

      async updateRtHash(studentId: string, rt: string) {
        let hash;
        if (rt) {
          hash = await this.hashData(rt);
        } else {
          hash = null;
        }
        const doc = await this.studentService.updateStudent(studentId, {
          hashedRt: hash,
        });
        // if (!doc) {
        //   throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        // } else {
        //   console.log('Updated document: ', doc);
        // }
        return true;
      }
    
      async ustazupdateRtHash(ustazId: string, rt: string) {
        let hash;
        if (rt) {
          hash = await this.hashData(rt);
        } else {
          hash = null;
        }
        const doc = await this.ustazService.updateustaz(ustazId, {
          hashedRt: hash,
        });
        // if (!doc) {
        //   throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        // } else {
        //   console.log('Updated document: ', doc);
        // }
        console.log("purppose");
        return true;
      }
      async adminupdateRtHash(adminId: string, rt: string) {
        let hash;
        if (rt) {
          hash = await this.hashData(rt);
        } else {
          hash = null;
        }
        const doc = await this.studentService.updateAdmin(adminId, {
          hashedRt: hash,
        });
        // if (!doc) {
        //   throw new HttpException('A problem has occured', HttpStatus.BAD_REQUEST);
        // } else {
        //   console.log('Updated document: ', doc);
        // }
        console.log("purppose");
        return true;
      }
    
}
