const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUserById(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Usuario no encontrado");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export async function getTasksByUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/todos`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener las tareas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
}

export async function getData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
}