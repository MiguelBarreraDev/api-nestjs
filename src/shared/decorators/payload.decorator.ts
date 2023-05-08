import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator que extrae la propiedad user del objeto request.
 * La propiedad user fue establecida en el objeto request, por el JwtAuthGuar guard
 * ``` Example
 * // Usando en un controlador
 * countMedicos(@Payload() payload: PayloadEncodeInterface) {...}
 * ```
 */
export const Payload = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
