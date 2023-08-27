import { Body, Controller, Post } from '@nestjs/common';
import { UsatzService } from './usatz.service';

@Controller('ustaz')
export class UsatzController {
    constructor(private readonly ustazService: UsatzService) {}

    @Post('add ustaz')
    async addUstaz(
        @Body('fullName')  fullName: string,
        @Body('email')  email: string,
        @Body('password') password: string,
        @Body('role') role: string,
        @Body('classId') classId: string,
        @Body('avatar') avatar: string
    ){
        return this.ustazService.addUstaz(fullName, email, password, role, classId, avatar)
      }

      @Post('getustaz')
      async getustaz(@Body() email: {email: string}){
        return this.ustazService.findByemail(email)
      }
      @Post('getallUstazs')
  async getallustazs(){
    return this.ustazService.getallustazs()
  }

  @Post('updateustazProfile')
  async updateustazProfile( 
    @Body('fullName')  fullName: string,
  @Body('email')  email: string,
  @Body('password') password: string,
  @Body('role') role: string,
  @Body('classId') classId: string,
  @Body('newemail') newemail: string,
  @Body('newpassword') newpassword: string,
  @Body('avatar') avatar: string
  ){
    return this.ustazService.updateustazProfile(fullName, email, password, role, classId,newemail, newpassword, avatar)
  }
      
  @Post('deleteustaz')
  async deleteustazbyemail(@Body() data: {email: string,}) {
    return this.ustazService.deleteustaz(data)
  }


}
