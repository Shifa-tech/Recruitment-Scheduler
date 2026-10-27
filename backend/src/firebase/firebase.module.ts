import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service.js';

@Global() // Global means you don't have to import it in every other module
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}