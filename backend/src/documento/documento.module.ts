import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { Archivo } from './entities/archivo.entity';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Documento]),
    TypeOrmModule.forFeature([Archivo]),
  ],
  providers: [DocumentoService],
  controllers: [DocumentoController]
})
export class DocumentoModule {}
