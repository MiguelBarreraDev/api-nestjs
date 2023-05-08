import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const timer = this.startTimer();
    const { method, originalUrl, ip } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${ip}  ${timer()} ms`,
      );
    });

    next();
  }

  /**
   * Starts a timer to track the duration of the request
   * @returns A function that when called, calculates the elapsed time since the timer was started
   */
  startTimer() {
    const start = Date.now();
    return () => Date.now() - start;
  }
}
