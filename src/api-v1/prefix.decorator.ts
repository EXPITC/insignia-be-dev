import { applyDecorators, Controller } from '@nestjs/common';

export function ApiV1Controller(path: string) {
  return applyDecorators(Controller(`api/v1/${path}`));
}
