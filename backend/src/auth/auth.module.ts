import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { FirebaseAuthGuard } from "./firebase-auth.gaurd.js";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [FirebaseAuthGuard],
})
export class AuthModule {}