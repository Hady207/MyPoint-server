import { Module } from '@nestjs/common';
import { StoreModule } from './stores/stores.module';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    StoreModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://hady207:2071996@cluster0.e2ldh.mongodb.net/myPointV1?retryWrites=true&w=majority',
    ),
    AuthModule,
    BookingsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
