import { Injectable, PipeTransform } from '@nestjs/common';

import {
  PayloadDecodeInterface,
  PayloadEncodeInterface,
} from 'src/auth/interfaces/payload.interface';

/**
 * Custom pipe para transformar el objeto (payload) del JWT. Se renombra la
 * propiedad sub a userId.
 */
@Injectable()
export class ToPayloadDecodePipe implements PipeTransform {
  transform(value: PayloadEncodeInterface) {
    const { sub, ...rest } = value;
    return { ...rest, userId: sub };
  }
}

/**
 * Custom pipe para transformar el objeto (payload) del JWT. Se renombra la
 * propiedad userId a sub.
 */
@Injectable()
export class ToPayloadEncodePipe implements PipeTransform {
  transform(value: PayloadDecodeInterface) {
    const { userId, ...rest } = value;
    return { ...rest, sub: userId };
  }
}
