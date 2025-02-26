import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AlsInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly als: AsyncLocalStorage<{ userId: string }>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;

    let userId: string | null = null;

    if (req?.headers?.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = this.jwtService.verify(token);
        userId = payload.sub;
      } catch (e) {
        console.warn('JWT verification failed:', e);
      }
    }

    const store = { userId };

    return new Observable((subscriber) => {
      this.als.run(store, () => {
        next.handle().subscribe({
          next: (value) => subscriber.next(value),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
