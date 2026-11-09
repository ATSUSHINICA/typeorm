import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Archivo } from "./entities/archivo.entity";
import { Documento } from "./entities/documento.entity";

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
  ) {}

  findAll() {
    return this.documentoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.archivo", "principal")
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByArchivo(principalId: number) {
    return this.documentoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.archivo", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  searchByName(text: string) {
    return this.documentoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.archivo", "principal")
      .where("registro.nombre ILIKE :pattern", { pattern: `%${text}%` })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByArchivoAndMinimum(principalId: number, minimum: number) {
    return this.documentoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.archivo", "principal")
      .where("principal.id = :principalId", { principalId })
      .andWhere("registro.paginas >= :minimum", { minimum })
      .orderBy("registro.paginas", "DESC")
      .getMany();
  }

  countByArchivo() {
    return this.archivoRepository
      .createQueryBuilder("principal")
      .leftJoin("principal.documentos", "registro")
      .select("principal.id", "id")
      .addSelect("principal.nombre", "nombre")
      .addSelect("COUNT(registro.id)", "total")
      .groupBy("principal.id")
      .addGroupBy("principal.nombre")
      .orderBy("principal.id", "ASC")
      .getRawMany();
  }


  async nuevoDocumento(datos: { nombre: string; paginas: number; archivoId: number }) {
    const nuevo = this.documentoRepository.create({
      nombre: datos.nombre,
      paginas: datos.paginas,
      archivo: { id: datos.archivoId },
    });

    await this.documentoRepository.save(nuevo);

    return this.findAll();
  }

  async eliminar(id: number) {

    await this.documentoRepository.delete(id);
    return this.findAll();
  }

  async modificarNombre(id: number, nuevoNombre: string) {
    await this.documentoRepository.update(id, {
      nombre: nuevoNombre,
    });

    return this.findAll();
  }

  async modificarRelacion(id: number, archivoId: number) {
  await this.documentoRepository.update(id, {
    archivo: { id: archivoId },
  });

  return this.findAll();
  }

  async findByArchivoId(id: number) {
    await this.documentoRepository
      .createQueryBuilder("documento")
      .innerJoinAndSelect("documento.archivo", "archivo")
      .where("archivo.id = :id", { id })
      .getMany();

    return this.findAll();
  }

}