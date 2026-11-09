PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> curl -i http://localhost:3000/documentos
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 405
ETag: W/"195-Bp/4PE5B6R25gMrMO/EnIuPIulk"
Date: Mon, 09 Nov 2026 18:53:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":4,"nombre":"Inventario antiguo","paginas":20,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":5,"nombre":"Memoria del barrio","paginas":75,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":6,"nombre":"Inventario antiguo - nuevo","paginas":95,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":7,"nombre":"Manual NestJS","paginas":250,"archivo":{"id":1,"nombre":"Archivo Municipal"}}]


PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> curl.exe -i -X POST "http://localhost:3000/documentos/crear" -H "Content-Type: application/json" -d '{"nombre":"Documento de prueba","paginas":25,"archivoId":1}'
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 608
ETag: W/"260-sRy58g9oku5HaLmlFyfORLRgWIA"
Date: Mon, 09 Nov 2026 18:58:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":4,"nombre":"Inventario antiguo","paginas":20,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":5,"nombre":"Memoria del barrio","paginas":75,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":6,"nombre":"Inventarioantiguo - nuevo","paginas":95,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":7,"nombre":"Manual NestJS","paginas":250,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":9,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":10,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}}]
PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> 


PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> curl.exe -i -X PATCH "http://localhost:3000/documentos/modificar/8"
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 608
ETag: W/"260-sRy58g9oku5HaLmlFyfORLRgWIA"
Date: Mon, 09 Nov 2026 18:59:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":4,"nombre":"Inventario antiguo","paginas":20,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":5,"nombre":"Memoria del barrio","paginas":75,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":6,"nombre":"Inventarioantiguo - nuevo","paginas":95,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":7,"nombre":"Manual NestJS","paginas":250,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":9,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":10,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}}]
PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> 


PS C:\Users\josea\Documents\GITHUB\DAM2 (git)\DOCUMENTOS\DESARROLLO DE APLICACIONES MOVILES\1 trimestre\UNIDAD 3-FULL STACK\C03-DataBridge\typeorm-base> curl.exe -i -X PATCH "http://localhost:3000/documentos/modificarArchivo/8" -H "Content-Type: application/json" -d '{"archivoId":2}'
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 608
ETag: W/"260-sRy58g9oku5HaLmlFyfORLRgWIA"
Date: Mon, 09 Nov 2026 18:59:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":4,"nombre":"Inventario antiguo","paginas":20,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":5,"nombre":"Memoria del barrio","paginas":75,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":6,"nombre":"Inventarioantiguo - nuevo","paginas":95,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":7,"nombre":"Manual NestJS","paginas":250,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":9,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}},{"id":10,"nombre":"Documento de prueba","paginas":25,"archivo":{"id":1,"nombre":"Archivo Municipal"}}]
