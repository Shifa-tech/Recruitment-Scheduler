import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express'; 
import { FirebaseAuthGuard } from "./firebase-auth.guard.js";
import { UserService } from '../user/user.service.js';

// Create a custom type so TypeScript knows about the user we attach in the Guard
interface RequestWithUser extends Request {
  user: {
    uid: string;
    email: string;
    name: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('sync')
  async sync(@Req() req: RequestWithUser) { 
    return this.userService.syncUser(
      req.user.uid, 
      req.user.email, 
      req.user.name
    );
  }
}