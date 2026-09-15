/*
  EDITA SOLAMENTE ESTE ARCHIVO PARA:
  1. Cambiar las imágenes del menú.
  2. Cambiar WhatsApp.
  3. Cambiar Instagram.

  Puedes agregar o quitar tantas imágenes como quieras.
*/
window.POLEMICO_CONFIG = {
  menuImages: [
    "menu/menu-1.jpg"
  ],

  // Formato internacional, SOLO números. Ejemplo Venezuela: 584121234567
  whatsappLocations: [
    {
      name: "Sede de Catia",
      number: "584241431487",
      message: "Hola te saludamos desde Polemico Pork, estamos listos para recibir tu pedido"
      schedule: {
        0: ["12:00", "21:00"],
        1: null,
        2: null,
        3: null,
        4: ["12:00", "21:00"],
        5: ["12:00", "23:00"],
        6: ["12:00", "23:00"]
      }
    },
    {
      name: "Delivery Sede Altamira",
      number: "584248623696",
      message: "Hola te saludamos desde Polemico Pork, estamos listos para recibir tu pedido"
      schedule: {
        0: ["11:30", "20:00"], // domingo
        1: null,               // lunes cerrado
        2: ["11:30", "20:00"], // martes
        3: ["11:30", "20:00"], // miércoles
        4: ["11:30", "20:00"], // jueves
        5: ["12:00", "21:00"], // viernes
        6: ["12:00", "21:00"]  // sábado
      }
    }
  ],

  instagramUrl: "https://www.instagram.com/polemico.pork/"
};
