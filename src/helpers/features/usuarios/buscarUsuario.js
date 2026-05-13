import { get } from '../../api/index.js';

export const inicializarBusquedaUsuario = (alEncontrarUsuario) => {

  const formUsuario = document.querySelector("#formUsuario");

  const resultadoUsuario = document.querySelector("#resultadoUsuario");

  if (!formUsuario) return;

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
