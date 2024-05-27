import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { GetUser, GetRawHeaders, RoleProtected, Auth } from './decorators';
import { ValidRoles } from './interfaces';
import { UserRoleGuard } from './guards/user-role.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // @Auth('admin')
  register(@Body() createUserDto: CreateUserDto ) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto:LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user:User,
  ){
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(

    
    @GetUser() user:User,
    @GetUser('email') userEmail:string,

    @GetRawHeaders() rawHeaders:string[],
  ){

    return {
      ok:true,
      user,
      rawHeaders
    }
  }

  @Get('private2')
  @RoleProtected('user')
  @UseGuards( AuthGuard(), UserRoleGuard )
  private2(
    @GetUser() user: User,
  ){
    return {
      ok:true,
      user,
    }
  }

  @Get('private3')
  @Auth('admin')
  private3(
    @GetUser() user:User,
  ){
    return {
      ok:true,
      user,
    }
  }



}
