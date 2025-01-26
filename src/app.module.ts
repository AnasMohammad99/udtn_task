import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './jwtAuthGuard';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'outlook',
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.HOST_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [JwtAuthGuard, AppService],
})
export class AppModule {}
