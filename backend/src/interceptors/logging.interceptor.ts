import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logging } from './logging.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Begin Before
    const url = context.switchToHttp().getRequest().url;
    const now = Date.now();
    // END Before
    return next
    .handle()
    .pipe(
      tap(() => {
        // Begin After
        const req = context.switchToHttp().getRequest();
        const {url, user, method} = req;
        console.log(user);
        if(user) {
          console.log(`${method} ${url} ${user.email} ${Date.now() - now}ms`);
        } else {
          console.log(`${method} ${url} ${Date.now() - now}ms`);
        }
          // End After
        }),
      );
  }
}