import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { FirebaseAuthGuard } from "./firebase-auth.gaurd.js";
import { Roles, RolesGuard } from './roles.gaurd.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [FirebaseAuthGuard , RolesGuard],
  exports: [FirebaseAuthGuard , RolesGuard]
})
export class AuthModule {}