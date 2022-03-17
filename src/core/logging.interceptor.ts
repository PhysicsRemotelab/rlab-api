import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log(context.getArgs()[0].route.stack[0].method.toUpperCase(), context.getArgs()[0].route.path, context.getArgs()[0].body);
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                console.log(`End ${Date.now() - now}ms`);
            })
        );
    }
}
