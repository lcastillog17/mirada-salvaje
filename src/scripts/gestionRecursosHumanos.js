import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";
import { obtenerIdentificadorUnico, cargarDatosEnTabla, llenarTablas, mostrarSeccion } from "./utils.js";

const EMPLEADOS = "empleados";
const ASISTENCIAS = "asistencias";

const guardarEmpleadoBtn = document.getElementById("guardarEmpleadoBtn");
const guardarAsistenciaBtn = document.getElementById("guardarAsistenciaBtn");

const secciones = document.querySelectorAll("section");
const seleccionSeccion = document.getElementById("seleccion-seccion");
const seccionPredeterminada = document.querySelector(
  'input[type="radio"]:checked'
).value;

seleccionSeccion.addEventListener("change", (e) => {
  mostrarSeccion(secciones, e.target.value);
});

guardarEmpleadoBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const empleadosData = await leerDocumento(EMPLEADOS);
    const id = obtenerIdentificadorUnico();
    const nombre = document.getElementById("nombreEmpleado").value;
    const puesto = document.getElementById("puesto").value;
    const salario = document.getElementById("salario").value;
    empleadosData.push({ id, nombre, puesto, salario });
    guardarDocumento(EMPLEADOS, empleadosData, cargarDatosEnTabla);
});

guardarAsistenciaBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const asistenciasData = await leerDocumento(ASISTENCIAS);
    const id = obtenerIdentificadorUnico();
    const empleado = document.getElementById("nombreAsistencia").value;
    const fecha = document.getElementById("fecha").value;
    asistenciasData.push({ id, empleado, fecha });
    guardarDocumento(ASISTENCIAS, asistenciasData, cargarDatosEnTabla);
});

mostrarSeccion(secciones, seccionPredeterminada);
await llenarTablas(EMPLEADOS, ASISTENCIAS);
