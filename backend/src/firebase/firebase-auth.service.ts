import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

/**
 * Service to handle Firebase authentication operations.
 * Implements OnModuleInit to initialize Firebase Admin SDK on module initialization.
 */
@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  /**
   * Initializes the Firebase Admin SDK if it hasn't been initialized already.
   * Reads the service account key from a file and uses it to initialize the SDK.
   */
  async onModuleInit() {
    if (admin.apps.length) return;

    try {
      const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
      if (!keyPath) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not defined');
      }

      const content = await this.getKeyFromFile(keyPath);
      const serviceAccount = JSON.parse(content) as ServiceAccount;

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error.message);
    }
  }

  /**
   * Reads the content of a file at the given path.
   * @param path - The path to the file.
   * @returns The content of the file as a string.
   */
  private async getKeyFromFile(path: string) {
    return readFile(path, 'utf8');
  }

  /**
   * Verifies the given Firebase ID token.
   * @param idToken - The Firebase ID token to verify.
   * @returns The decoded ID token if verification is successful.
   */
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(idToken);
  }

  /**
   * Creates a new Firebase user with the given email and password.
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   * @returns The created user record.
   */
  async createUser(email: string, password: string) {
    return admin.auth().createUser({
      email,
      password,
    });
  }
}
