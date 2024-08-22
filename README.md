# Projects Portfolio
Projects Portfolio, es una aplicacion web que permite agregar, gestionar y visualizar proyectos de desarrollo de software. Además, permite a los visitantes interactuar con el contenido y enviar mensajes.

## Tabla de contenido
- [Introduccion](#introduccion)
- [Como empezar](#como-empezar)
    - [Configuracion rapida](#configuracion-rapida)
- [Preview](#preview)
- [Licencia](#licencia)
- [Referencias](#referencias)

## Introduccion
La webApp fue realizada con: 
Next.js, MUI, MongoDb y Redux para el estado de la aplicacion.

Permite al administrador:
- 🖼️ Añadir proyectos o publicaciones (historias), añadir datos varios y subir una imagen o gif.
- ❌ Eliminar los proyectos o publicaciones.
- 💌 Revisar los mensajes en bandeja.

Permite a los usuarios:
- 🖼️ Ver los proyectos o publicaciones.
- ♥️ Dar Like o Me gusta al contenido.
- 📨 Enviar mensajes al admin.
- 🤵 Ver el perfil del admin y datos de contacto.

## Como empezar
## Configuracion rapida
Prerequisitos:
1. Node.js
2. Node.js package manager: npm

.env
```bash
    MONGODB_URI = connection string - mongoDB cluster
    SERVER_PROD = website base url
    ADMIN = admin secret password
```
localStorage
```bash
    userId: ADMIN | randomId
```

dependencies install
```bash
npm install 
```
run
```bash
npm run dev
```

## Preview
![gif](https://raw.githubusercontent.com/ronaldtro/projectsImages/main/PortafolioOnlineGif.gif)

## Licencia
Este proyecto es de codigo abierto y esta licenciado bajo [MIT](/LICENSE).

## Referencias
@GentlemanProgramming/Youtube