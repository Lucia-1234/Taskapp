import { get } from '../../api/index.js';

let usuariosCache = [];

export const obtenerUsuariosCache = () => usuariosCache;

export const inicializarBusquedaUsuario = (alEncontrarUsuario) => {

  const formUsuario = document.querySelector("#formUsuario");

  const resultadoUsuario = document.querySelector("#resultadoUsuario");

  if (!formUsuario) return;

  // Cargar lista de usuarios al inicio 
  const cargarUsuariosIniciales = async () => {
    const container = document.querySelector("#usuariosItemsContainer");
    const listContainer = document.querySelector("#listaUsuariosDisponibles");
    if (!container || !listContainer) return;

    try {
      const usuarios = await get("users");
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        usuariosCache = usuarios;
        listContainer.classList.remove("hidden");
        container.innerHTML = "";
        usuarios.forEach(user => {
          const item = document.createElement("div");
          item.className = "user-item";

          const info = document.createElement("span");
          info.className = "user-item__info";
          info.textContent = `ID: ${user.id} - ${user.name} (${user.active ? 'Activo' : 'Inactivo'})`;

          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "user-item__btn";
          btn.textContent = "Seleccionar";
          btn.addEventListener("click", () => {
            const usuarioIdInput = document.querySelector("#usuarioId");
            if (usuarioIdInput) {
              usuarioIdInput.value = user.id;
              formUsuario.dispatchEvent(new Event("submit"));
            }
          });

          item.append(info, btn);
          container.append(item);
        });
      }
    } catch (error) {
      console.error("Error al cargar la lista de usuarios:", error);
    }
  };

  cargarUsuariosIniciales();

  formUsuario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuarioIdInput = document.querySelector("#usuarioId");

    if (!usuarioIdInput || !usuarioIdInput.value.trim()) return;

    const usuarioId = usuarioIdInput.value.trim();

    resultadoUsuario.className = "texto--buscando";

    resultadoUsuario.textContent = "Buscando usuario...";

    try {

      const usuario = await get(`users/${usuarioId}`);

      if (usuario && usuario.id) {

        resultadoUsuario.className = "texto--exito";

        resultadoUsuario.textContent = `Usuario: ${usuario.name} | Está activo: ${usuario.active}`;

        alEncontrarUsuario(usuario);

      }

    } catch (error) {

      resultadoUsuario.className = "texto--error";

      resultadoUsuario.textContent = "Usuario no encontrado.";

      alEncontrarUsuario(null);

    }

  }

  );

}

