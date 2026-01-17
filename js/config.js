/**
 * config.js
 * Todo lo editable por el vendedor/cliente.
 * Edita estos valores para personalizar la página sin tocar el resto.
 */

const BARBER_CONFIG = {
  businessName: "King Barber",
  phoneNumber: "573208399429",          // Formato internacional sin '+', e.g. 573xxxxxxxxx
  whatsappDefaultMessage: "Hola, quiero agendar una cita en King Barber. ¿Tienen disponibilidad hoy?",
  googleMapsUrl: "https://maps.app.goo.gl/dmwNej11fSnfcByU6",
  address: "Cl. 10 #19-58, Bucaramanga, Santander",
  hoursText: "Lun - Vie: 9:00 - 20:00\nSáb: 9:00 - 20:00 · Dom: Cerrado",
  year: new Date().getFullYear(),

  /* Servicios: cada objeto puede tener title y optional price (texto) */
  services: [
    { title: "Corte clásico", price: "Desde $15.000" },
    { title: "Corte difuminado", price: "Desde $18.000" },
    { title: "Barba con navaja", price: "Desde $12.000" },
    { title: "Recorte de barba", price: "Desde $8.000" },
    { title: "Cortes para niños", price: "Desde $12.000" },
    { title: "Tintura y mechas", price: "Consulta" }
  ],

  /* Plantillas de mensajes rápidos (se muestran en dialog) */
  messagesTemplates: [
    "Hola, quiero agendar un corte difuminado para hoy en la tarde. ¿Tienen disponibilidad?",
    "Hola, ¿cuánto cuesta un corte clásico y cuánto tiempo dura?",
    "Buen día, quisiera reservar para 2 personas el sábado en la mañana.",
    "Hola, tengo corte con barba. ¿Pueden hacerlo con navaja?"
  ]
};