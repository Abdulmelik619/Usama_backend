import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/isPublic.decorator';
import { studentDto } from 'src/student/student.dto';
import { loginDto } from './loginDto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public() 
    @Post('signup/student')
    async signUpStudent(@Body() dto: studentDto) {
      console.log(`helllo ${dto.Surah_name}`);
      return this.authService.signUpStudent(dto);
    }

    @Public() 
    @Post('signup/ustaz')
    async signUpUstaz(
      @Body('fullName')  fullName: string,
        @Body('email')  email: string,
        @Body('password') password: string,
        @Body('role') role: string,
        @Body('classId') classId: string,
        @Body('avatar') avatar: string
    ) {
      var object = await this.authService.signUpUstaz(fullName, email, password, role, classId, avatar);
      console.log("this");
      console.log(object);
      return object;
    }

    @Public() 
    @Post('signup/admin')
    async signUpAdmin(
        @Body('email')  email: string,
        @Body('password') password: string,
        @Body('role') role: string,
    ) {
      var object = await this.authService.signUpAdmin( email, password, role,);
      console.log("this");
      console.log(object);
      return object;
    }
  
    @Public()
    @Post('login')
    async login(@Body() dto: loginDto) {
      return this.authService.loginStudent(dto);
    }
  
    @Post('logout')
    async logout(@Body('email') email: string) {
      return this.authService.logoutUser(email);
    }

    @Post('refresh')
    async refreshTokens(@Body() ref: {email: string, rt: string}) {
      console.log(ref, 'fd');
      return this.authService.refreshTokens(ref);
    }
  }




