import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Connection, EntityRepository} from 'typeorm';
import { Logging } from './logging.entity';
import { Repository } from 'typeorm';
import { LoggingService } from './logging.service';
import * as js2xmlparser from 'js2xmlparser';
// No TS support
// const xml = require('xml');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Begin Before
    const req = context.switchToHttp().getRequest();
    const extension = req.params.ext;
    // END Before
    return next
    .handle()
    .pipe(
      tap(() => {
        // Begin After
        const req = context.switchToHttp().getRequest();
        const {url, user, method} = req;
        const now  = Date.now();
        if(user) {
          console.log(`${method} ${url} ${user.email} ${Date.now() - now}ms`);
        } else {
          console.log(`${method} ${url} ${Date.now() - now}ms`);
        }
          // End After
        }),
      ).pipe(map((data) => {
        switch(extension) {
          case 'xml':
            req.res.type('application/xml');
            return js2xmlparser.parse('response', data);
          default:
            return {data};
        }
      }))
  }
}