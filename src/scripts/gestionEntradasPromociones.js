import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";
import {
  obtenerIdentificadorUnico,
  cargarDatosEnTabla,
  llenarTablas,
  mostrarSeccion,
} from "./utils.js";

const ENTRADAS = "entradas";
const PROMOCIONES = "promociones";

const guardarEntradaBtn = document.getElementById("guardarEntradaBtn");
const guardarPromocionBtn = document.getElementById("guardarPromocionBtn");

const secciones = document.querySelectorAll("section");
const seleccionSeccion = document.getElementById("seleccion-seccion");
const seccionPredeterminada = document.querySelector(
  'input[type="radio"]:checked'
).value;

seleccionSeccion.addEventListener("change", (e) => {
  mostrarSeccion(secciones, e.target.value);
});

guardarEntradaBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const entradasData = await leerDocumento(ENTRADAS);
  const id = obtenerIdentificadorUnico();
  const tipo = document.getElementById("tipoEntrada").value;
  const precio = document.getElementById("precio").value;
  entradasData.push({ id, tipo, precio });
  guardarDocumento(ENTRADAS, entradasData, cargarDatosEnTabla);
});

guardarPromocionBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const promocionesData = await leerDocumento(PROMOCIONES);
  const id = obtenerIdentificadorUnico();
  const nombre = document.getElementById("nombrePromocion").value;
  const descripcion = document.getElementById("descripcion").value;
  const descuento = document.getElementById("descuento").value;
  promocionesData.push({ id, nombre, descripcion, descuento });
  guardarDocumento(PROMOCIONES, promocionesData, cargarDatosEnTabla);
});

mostrarSeccion(secciones, seccionPredeterminada);
await llenarTablas(ENTRADAS, PROMOCIONES);
