import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StocksModule } from './stocks/stocks.module';
import { FavouritesModule } from './favourites/favourites.module';


const { env } = process;


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'hs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    StocksModule,
    FavouritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
