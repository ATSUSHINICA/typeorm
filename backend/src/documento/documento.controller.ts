import { Controller, Get, Param, Query, Post,Patch, Body, Delete } from "@nestjs/common";
import { DocumentoService } from "./documento.service";

@Controller("documentos")
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Get()
  findAll() {
    return this.documentoService.findAll();
  }

  @Get("archivo/:principalId")
  findByArchivo(@Param("principalId") principalId: string) {
    return this.documentoService.findByArchivo(Number(principalId));
  }

  @Get("buscar")
  searchByName(@Query("texto") text: string) {
    return this.documentoService.searchByName(text);
  }

  @Get("archivo/:principalId/minimo/:minimum")
  findByArchivoAndMinimum(
    @Param("principalId") principalId: string,
    @Param("minimum") minimum: string,
  ) {
    return this.documentoService.findByArchivoAndMinimum(Number(principalId), Number(minimum));
  }

  @Get("resumen/archivo")
  countByArchivo() {
    return this.documentoService.countByArchivo();
  }


  @Post("crear")
  nuevoDocumento(@Body() datos: { nombre: string; paginas: number; archivoId: number }) {
    return this.documentoService.nuevoDocumento(datos);
  }

  @Delete("eliminar/:id")
  eliminar(@Param("id") id: number) {
    return this.documentoService.eliminar(id);
  }

  @Patch("modificar/:id")
  modificarNombre(@Param("id") id: number) {
    return this.documentoService.modificarNombre(id, "Nuevo nombre");
  }

    @Patch("modificarArchivo/:id")
  modificarRelacion(
    @Param("id") id: number,
    @Body("archivoId") archivoId: number,
  ) {
    return this.documentoService.modificarRelacion(id, archivoId);
  }

@Get("archivo/:id")
buscarPorArchivo(@Param("id") id: number) {
  return this.documentoService.findByArchivoId(id);
}
}