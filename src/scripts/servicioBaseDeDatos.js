export const API_URL = "https://mirada-salvaje-default-rtdb.firebaseio.com/";

export const leerDocumento = async (documento) => {
  return await fetch(`${API_URL}/${documento}.json`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error al obtener los datos");
    }
  });
}

export const guardarDocumento = async (documento, dato, callback) => {
  return await fetch(`${API_URL}/${documento}.json`, {
    method: "PUT",
    body: JSON.stringify(dato),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error al obtener los datos");
    }
  }).then((data) => {
    callback(data, documento);
  });
};
