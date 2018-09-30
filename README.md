## Estructura

**__test__**: contiene los tests que prueban las funcionalidades de la capa de servicios, y los de integración de todos los componentes para la api.

**config**: contiene un archivo con la configuración necesaria para que el servicio pueda trabajar.

**api**: contiene los directorios con los módulos necesarios para que el servicio pueda funcionar via http.

**api.server**: tiene la configuración para expressjs.

**api.routes**: tiene la configuración de las rutas con sus respectivos controladores.

**api.controllers**: tiene las funciones que se le pasan a las rutas, y las funciones tienen los parámetros necesarios para trabajar con expressjs.

**api.services**: tiene la lógica para crear las urls cortas y realizar las consultas necesarias. Esta capa se añade por si en algún momento se hace necesario implementar otro canal como grpc, rpc, etc. Mantiene los controladores que dependen de expressjs limpios.

**api.utils**: contiene algunas funciones de ayuda.

**Dockerfile**: contiene las intrucciones para generar una imagen docker.

### API

> GET /v1/query?question=de que tipo charmander

Ejemplo respuesta:

```
{
    "request": 1538325670728,
    "url": "http://localhost:3000/v1/query?question=de que tipo charmander",
    "data": {
        "message": "Es de tipo fire."
    },
    "code": 200
}
```