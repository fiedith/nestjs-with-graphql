import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// custom defined filter (note nest lifecycle regarding filters)
// will catch all types of HttpException
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    // example usage
    console.log('-----------------');
    console.log('exception occurred');
    console.log(message);
    console.log(status);
    console.log('-----------------');
  }
}
