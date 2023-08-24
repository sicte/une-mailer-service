import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return {
      'RUNNING IN ENV': process.env.NODE_ENV,
      'RUNNING IN OS': process.platform,
      'EXECUTED WITH COMMAND': process.env.npm_lifecycle_event,
      'RUNNING PROJECT': process.env.npm_package_name,
      'PROJECT VERSION': process.env.npm_package_version,
    };
  }
}
