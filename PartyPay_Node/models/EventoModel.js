/**
 * Modelo de Evento para PartyPay
 *
 * Campos:
 * - eventId: number (PK) – Identificador único del evento (generado automáticamente).
 * - logo: string – Ruta hacia el recurso de ícono o imagen del evento. Valor predeterminado: "./assets/eventos"
 * - titulo: string – Nombre o título del evento.
 * - fecha: string – Fecha del evento en formato "dd/mm/yyyy" (se espera que se seleccione desde un calendario).
 * - direccion: string – Dirección física donde se realizará el evento.
 * - maps: string – URL o enlace de la ubicación en mapas (por ejemplo, Google Maps).
 * - gastos: array – Lista de objetos que representan cada gasto vinculado al evento (se espera que cada objeto contenga al menos la propiedad "monto").
 * - participantes: array – Lista de objetos con la información de cada participante.
 *
 * Campos calculados:
 * - gastoTotal: number – Sumatoria de todos los "monto" de cada gasto.
 * - participantesNro: number – Número de participantes vinculados (longitud del array participantes).
 * - gastoCU: number – Gasto por cabeza, calculado como gastoTotal / participantesNro (si hay participantes).
 */

class Evento {
    /**
     * Crea una nueva instancia de Evento.
     * 
     * @param {Object} params - Parámetros para crear el evento.
     * @param {string} params.titulo - Título del evento.
     * @param {string} params.fecha - Fecha del evento (formato "dd/mm/yyyy").
     * @param {string} params.direccion - Dirección del evento.
     * @param {string} params.maps - Enlace para ubicar el evento en un mapa.
     * @param {Array} [params.gastos=[]] - Lista de gastos, cada uno con al menos la propiedad "monto" (number).
     * @param {Array} [params.participantes=[]] - Lista de participantes.
     * @param {string} [params.logo="./assets/eventos"] - Ruta del logo o imagen principal.
     */
    constructor({
      titulo,
      fecha,
      direccion,
      maps,
      gastos = [],
      participantes = [],
      logo = "./assets/eventos",
    }) {
      // Genera automáticamente un ID único para el evento (ejemplo: número basado en la marca de tiempo)
      this.eventId = Evento.generateId();
      this.logo = logo;
      this.titulo = titulo;
      this.fecha = fecha; // Se espera en formato "dd/mm/yyyy" (seleccionado mediante un calendario)
      this.direccion = direccion;
      this.maps = maps;
      this.gastos = gastos;
      this.participantes = participantes;
  
      // Campos calculados
      this.gastoTotal = this.calculateGastoTotal();
      this.participantesNro = this.participantes.length;
      this.gastoCU = this.participantesNro > 0 ? this.gastoTotal / this.participantesNro : 0;
    }
  
    /**
     * Genera un identificador único para el evento.
     * @returns {number} ID único.
     */
    static generateId() {
      return Date.now(); // Ejemplo: utiliza el número de milisegundos desde 1970.
    }
  
    /**
     * Calcula el gasto total sumando el "monto" de cada gasto.
     * @returns {number} Gasto total.
     */
    calculateGastoTotal() {
      return this.gastos.reduce((total, gasto) => total + (gasto.monto || 0), 0);
    }
  }
  
  module.exports = Evento;
  