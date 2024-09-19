import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getPort(): string {
    const port = process.env.PORT_BE || 3000;
    return JSON.stringify({
      info: `Server is running on port ${port}`,
    });
  }
}
