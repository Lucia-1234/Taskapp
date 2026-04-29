// users.js
import { getUserById, getData } from "./get.js";

/**
 * Busca un usuario por ID y retorna sus datos
 *  ID del usuario
 *  Datos del usuario o null si no existe
 */
export async function findUser(userId) {
  const user = await getUserById(userId);
  return user ? user : null;
}

/**
 * Obtiene todos los usuarios
 * Lista de usuarios
 */
export async function getAllUsers() {
  return await getData("users");
}

/**
 * Muestra los datos del usuario en el DOM
 *  Objeto con datos del usuario
 *  Contenedor donde mostrar los datos
 */
export function renderUser(user, container) {
  if (!user) {
    container.innerHTML = `<p style="color:red;">Usuario no encontrado</p>`;
    return;
  }

}