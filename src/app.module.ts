import { Module } from '@nestjs/common';
import { StoreModule } from './stores/stores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    StoreModule,
    MongooseModule.forRoot(
      'mongodb+srv://hady207:2071996@cluster0.e2ldh.mongodb.net/myPointV1?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
