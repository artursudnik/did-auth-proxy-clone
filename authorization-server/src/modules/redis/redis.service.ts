import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnApplicationShutdown
{
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    super({
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASSWORD'),
      lazyConnect: true,
    });

    this.logger.setContext(RedisService.name);

    this.on('connect', () => this.logger.debug({ event: 'connect' }));
    this.on('ready', () => this.logger.info({ event: 'ready' }));
    this.on('end', () => this.logger.info({ event: 'disconnected' }));
    this.on('error', (err) => this.logger.error(err));
    this.on('reconnecting', () => this.logger.warn({ event: 'reconnecting' }));
  }

  async onModuleInit() {
    try {
      this.logger.debug('connecting');
      await this.connect();
    } catch (err) {
      this.logger.error(`error initializing Redis connection: ${err}`);
      if (this.configService.get<boolean>('FAIL_ON_REDIS_UNAVAILABLE')) {
        throw new Error('unable to connect to Redis instance');
      }
    }
  }

  async onApplicationShutdown() {
    this.logger.debug('disconnecting');
    this.disconnect();
  }
}
