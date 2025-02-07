import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { join } from 'path';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  async onModuleInit() {
    if (admin.apps.length) return;

    try {
      const isDev = process.env.NODE_ENV !== 'production';
      const keyPath = join(
        process.cwd(),
        isDev
          ? '/src/config/firebase-service-account-key.json'
          : '/dist/config/firebase-service-account-key.json',
      );
      const content = await this.getKeyFromFile(keyPath);
      const serviceAccount = JSON.parse(content) as ServiceAccount;

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async getKeyFromFile(path: string) {
    return readFile(path, 'utf8');
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(idToken);
  }

  async createUser(email: string, password: string) {
    return admin.auth().createUser({
      email,
      password,
    });
  }
}
