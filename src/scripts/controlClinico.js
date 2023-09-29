import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";
import {
  obtenerIdentificadorUnico,
  cargarDatosEnTabla,
  llenarTablas,
  mostrarSeccion,
} from "./utils.js";

const MEDICAMENTOS = "medicamentos";
const VACUNAS = "vacunas";
const VITAMINAS = "vitaminas";

const guardarMedicamentoBtn = document.getElementById("guardarMedicamentoBtn");
const guardarVacunaBtn = document.getElementById("guardarVacunaBtn");
const guardarVitaminaBtn = document.getElementById("guardarVitaminaBtn");

const secciones = document.querySelectorAll("section");
const seleccionSeccion = document.getElementById("seleccion-seccion");
const seccionPredeterminada = document.querySelector(
  'input[type="radio"]:checked'
).value;

seleccionSeccion.addEventListener("change", (e) => {
  mostrarSeccion(secciones, e.target.value);
});

guardarMedicamentoBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const medicamentosData = await leerDocumento(MEDICAMENTOS);
  const id = obtenerIdentificadorUnico();
  const nombre = document.getElementById("nombreMedicamento").value;
  const dosis = document.getElementById("dosisMedicamento").value;
  medicamentosData.push({ id, nombre, dosis });
  guardarDocumento(MEDICAMENTOS, medicamentosData, cargarDatosEnTabla);
});

guardarVacunaBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const vacunasData = await leerDocumento(VACUNAS);
  const id = obtenerIdentificadorUnico();
  const nombre = document.getElementById("nombreVacuna").value;
  const fechaAplicacion = document.getElementById("fechaAplicacion").value;
  vacunasData.push({ id, nombre, fechaAplicacion });
  guardarDocumento(VACUNAS, vacunasData, cargarDatosEnTabla);
});

guardarVitaminaBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const vitaminasData = await leerDocumento(VITAMINAS);
  const id = obtenerIdentificadorUnico();
  const nombre = document.getElementById("nombreVitamina").value;
  const cantidad = document.getElementById("cantidadVitamina").value;
  vitaminasData.push({ id, nombre, cantidad });
  guardarDocumento(VITAMINAS, vitaminasData, cargarDatosEnTabla);
});

mostrarSeccion(secciones, seccionPredeterminada);
await llenarTablas(MEDICAMENTOS, VACUNAS, VITAMINAS);
