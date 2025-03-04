import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

/**
 * Interceptor that transforms the response data to a specified class instance.
 *
 * @template T - The type of the class to transform the response data into.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  /**
   * Creates an instance of TransformInterceptor.
   *
   * @param classType - The class type to transform the response data into.
   */
  constructor(private readonly classType: new () => T) {}

  /**
   * Intercepts the response and transforms the data to the specified class instance.
   *
   * @param _context - The execution context.
   * @param next - The call handler.
   * @returns An observable of the transformed data.
   */
  intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
    return next
      .handle()
      .pipe(map((data) => plainToInstance(this.classType, data)));
  }
}
