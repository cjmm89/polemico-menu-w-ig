# POLEMICO MENU - VERCEL

## Qué hace
Esta página usa una URL fija para que puedas imprimir UN SOLO QR para siempre.

Ejemplo:
https://polemico-menu.vercel.app/

El QR apunta a esa URL.
Cuando cambies el menú, actualizas las imágenes del proyecto y haces un nuevo deploy.
NO tienes que cambiar ni volver a imprimir el QR.

## Archivos principales

- index.html = estructura de la página
- style.css = colores, tamaños y diseño
- config.js = imágenes del menú + WhatsApp + Instagram
- app.js = funcionamiento automático
- logo.png = coloca aquí tu logo
- /menu/ = coloca aquí las imágenes del menú

## Configuración rápida

1. Pon tu logo en la raíz con el nombre:
   logo.png

2. Mete las imágenes del menú dentro de:
   /menu/

Ejemplo:
   menu/menu-1.jpg
   menu/menu-2.jpg

3. Abre config.js.

4. Modifica:
   menuImages
   whatsappNumber
   whatsappMessage
   instagramUrl

## Para actualizar el menú después

FORMA MÁS FÁCIL:
Reemplaza menu-1.jpg y menu-2.jpg por las nuevas imágenes usando EXACTAMENTE los mismos nombres.
Haz Commit en GitHub.
Vercel desplegará la nueva versión.
El QR seguirá siendo exactamente el mismo.

También puedes agregar más páginas editando config.js:

menuImages: [
  "menu/menu-1.jpg",
  "menu/menu-2.jpg",
  "menu/menu-3.jpg"
]

## Recomendación importante

Cuando el proyecto esté publicado, usa la URL principal estable del proyecto para generar el QR.
NO uses una URL temporal de preview/deployment.
