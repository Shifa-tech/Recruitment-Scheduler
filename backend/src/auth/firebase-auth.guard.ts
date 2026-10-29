import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService,private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 1. Check if header exists and has the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      // 2. Verify the token with Firebase
      const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
      const dbUser = await this.userService.findByFirebaseUid(decodedToken.uid);

      // 3. Attach the Firebase data to the request object
      // Now, any controller using this guard can access req.user
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || 'New User',
        role: dbUser ? dbUser.role : 'CANDIDATE',
      };
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Firebase token');
    }
  }
}