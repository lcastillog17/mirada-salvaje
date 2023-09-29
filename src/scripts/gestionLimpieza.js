import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";
import {
  obtenerIdentificadorUnico,
  cargarDatosEnTabla,
  llenarTablas,
  mostrarSeccion,
} from "./utils.js";

const LIMPIEZAS = "limpiezas";

const guardarLimpiezaBtn = document.getElementById("guardarLimpiezaBtn");

const secciones = document.querySelectorAll("section");
const seleccionSeccion = document.getElementById("seleccion-seccion");
const seccionPredeterminada = document.querySelector(
  'input[type="radio"]:checked'
).value;

seleccionSeccion.addEventListener("change", (e) => {
  mostrarSeccion(secciones, e.target.value);
});

guardarLimpiezaBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const limpiezasData = await leerDocumento(LIMPIEZAS);
  const id = obtenerIdentificadorUnico();
  const area = document.getElementById("areaLimpieza").value;
  const tarea = document.getElementById("tarea").value;
  limpiezasData.push({ id, area, tarea });
  guardarDocumento(LIMPIEZAS, limpiezasData, cargarDatosEnTabla);
});

mostrarSeccion(secciones, seccionPredeterminada);
await llenarTablas(LIMPIEZAS);
