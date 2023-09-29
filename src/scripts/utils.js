import { leerDocumento, guardarDocumento } from "./servicioBaseDeDatos.js";

export function obtenerIdentificadorUnico() {
  // Genera un número aleatorio único entre 0 y 1 y lo convierte en cadena
  const randomPart = Math.random().toString(36).substring(2, 10);
  // Obtiene la marca de tiempo actual y lo convierte en cadena
  const timestampPart = Date.now().toString(36);
  // Combina las partes aleatorias y de tiempo para crear un ID único
  const uniqueId = randomPart + timestampPart;
  return uniqueId;
}

// Función para cargar datos en la tabla con columnas variables
// export function cargarDatosEnTabla(data, documento) {
//   const tablaId = `tabla-${documento}`;
//   const tabla = document.getElementById(tablaId);
//   const tbody = tabla.querySelector("tbody");
//   // Limpiar la tabla antes de cargar nuevos datos
//   tbody.innerHTML = "";
//   // Iterar sobre los datos y crear filas para la tabla
//   data.forEach((item) => {
//     const row = tbody.insertRow();
//     // Iterar sobre las propiedades del objeto y crear celdas para cada propiedad
//     for (const key in item) {
//       if (item.hasOwnProperty(key) && key !== "id") {
//         const cell = row.insertCell();
//         cell.textContent = item[key];
//       }
//     }
//     // Agregar botón de eliminar con un atributo personalizado para identificar el índice del elemento
//     const cellDelete = row.insertCell();
//     const deleteButton = document.createElement("button");
//     deleteButton.classList.add(`elminar-${documento}`);
//     deleteButton.textContent = "Eliminar";
//     deleteButton.dataset.index = item.id;
//     deleteButton.addEventListener("click", async (e) => {
//       e.preventDefault();
//       const id = deleteButton.dataset.index;
//       const index = data.findIndex((item) => item.id === id);
//       data.splice(index, 1);
//       guardarDocumento(documento, data, cargarDatosEnTabla);
//     });
//     cellDelete.appendChild(deleteButton);
//   });
// }

export function cargarDatosEnTabla(data, documento) {
  const tablaId = `tabla-${documento}`;
  const tabla = document.getElementById(tablaId);
  const tbody = tabla.querySelector("tbody");
  // Limpiar la tabla antes de cargar nuevos datos
  tbody.innerHTML = "";

  // Obtener los encabezados de la tabla
  const headers = tabla.querySelectorAll("thead th");

  // Iterar sobre los datos y crear filas para la tabla
  data.forEach((item) => {
    const row = tbody.insertRow();

    // Iterar sobre los encabezados y asignar valores de acuerdo a los IDs
    Array.from(headers).filter(header => header.id !== 'acciones').forEach((header) => {
      const propertyName = header.id;
      const cell = row.insertCell();
      cell.textContent = item[propertyName];
    });

    // Agregar botón de eliminar con un atributo personalizado para identificar el índice del elemento
    const cellDelete = row.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(`eliminar-${documento}`);
    deleteButton.textContent = "Eliminar";
    deleteButton.dataset.index = item.id;
    deleteButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = deleteButton.dataset.index;
      const index = data.findIndex((item) => item.id === id);
      data.splice(index, 1);
      guardarDocumento(documento, data, cargarDatosEnTabla);
    });
    cellDelete.appendChild(deleteButton);
  });
}

export const llenarTablas = async (...documentos) => {
  for (const documento of documentos) {
    const data = await leerDocumento(documento);
    cargarDatosEnTabla(data, documento);
  }
};

export const mostrarSeccion = (secciones, seccionNombre) => {
  secciones.forEach((seccion) => {
    if (seccion.id === `seccion-${seccionNombre}`) {
      seccion.style.display = "block";
    } else {
      seccion.style.display = "none";
    }
  });
};
