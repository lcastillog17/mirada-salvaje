import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";
import {
  obtenerIdentificadorUnico,
  cargarDatosEnTabla,
  llenarTablas,
  mostrarSeccion,
} from "./utils.js";

const HORARIOS = "horarios";
const DIETAS = "dietas";
const ALIMENTOS = "alimentos";

const guardarHorariosBtn = document.getElementById("guardarAlimentacionBtn");
const guardarDietaBtn = document.getElementById("guardarDietaBtn");
const guardarAlimentoBtn = document.getElementById("guardarAlimentoBtn");

const secciones = document.querySelectorAll("section");
const seleccionSeccion = document.getElementById("seleccion-seccion");
const seccionPredeterminada = document.querySelector(
  'input[type="radio"]:checked'
).value;

seleccionSeccion.addEventListener("change", (e) => {
  mostrarSeccion(secciones, e.target.value);
});

guardarHorariosBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const horariosData = await leerDocumento(HORARIOS);
  const id = obtenerIdentificadorUnico();
  const area = document.getElementById("areaAlimentacion").value;
  const horario = document.getElementById("horario").value;
  horariosData.push({ id, area, horario });
  guardarDocumento(HORARIOS, horariosData, cargarDatosEnTabla);
});

guardarDietaBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const dietasData = await leerDocumento(DIETAS);
  const id = obtenerIdentificadorUnico();
  const animal = document.getElementById("animal").value;
  const dieta = document.getElementById("dieta").value;
  dietasData.push({ id, animal, dieta });
  guardarDocumento(DIETAS, dietasData, cargarDatosEnTabla);
});

guardarAlimentoBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const alimentosData = await leerDocumento(ALIMENTOS);
  const id = obtenerIdentificadorUnico();
  const nombre = document.getElementById("nombreAlimento").value;
  const cantidad = document.getElementById("cantidad").value;
  alimentosData.push({ id, nombre, cantidad });
  guardarDocumento(ALIMENTOS, alimentosData, cargarDatosEnTabla);
});

mostrarSeccion(secciones, seccionPredeterminada);
await llenarTablas(HORARIOS, DIETAS, ALIMENTOS);
