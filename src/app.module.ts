import { Module } from '@nestjs/common';
import { StoreModule } from './stores/stores.module';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      autoIndex: true,
    }),
    StoreModule,
    UserModule,
    AuthModule,
    BookingsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
