import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

/**
 * Guard that checks the Firebase authentication token.
 * It implements the CanActivate interface to determine if a request is authorized.
 */
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  /**
   * Determines if the request is authorized by verifying the Firebase ID token.
   * @param context - The execution context that contains the request.
   * @returns A boolean indicating if the request is authorized.
   * @throws UnauthorizedException if the authorization header is missing or the token is invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];
    try {
      const decodedToken = await this.firebaseAuthService.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
