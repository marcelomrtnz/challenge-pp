import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    //Creamos el serve del frontend en el root
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend-build'), 
      //Hacemos que todas las llamadas específicas de la api tengan el prefijo "/api/"
      exclude: ['/api/(.*)']
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
