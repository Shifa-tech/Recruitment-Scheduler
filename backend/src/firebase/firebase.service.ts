import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    // Check if Firebase is already initialized
    if (!getApps().length) {
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
      
      if (!serviceAccountPath) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is not defined in .env');
      }

      const absolutePath = path.resolve(process.cwd(), serviceAccountPath);

      initializeApp({
        credential: cert(absolutePath),
      });

      console.log('🔥 Firebase Admin initialized successfully');
    }
  }

  // This uses the getAuth imported from 'firebase-admin/auth'
  getAuth() {
    return getAuth();
  }
}