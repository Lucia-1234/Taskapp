export const mostrarNombreUsuario = (nombre) => {
    const resultadoUsuario = document.querySelector("#resultadoUsuario");
    if (!resultadoUsuario) return;

    resultadoUsuario.className = "texto--exito";
    resultadoUsuario.textContent = `Usuario encontrado: ${nombre}`;
};

export const ocultarNombreUsuario = () => {
    const resultadoUsuario = document.querySelector("#resultadoUsuario");
    if (!resultadoUsuario) return;

    resultadoUsuario.className = "texto--error";
    resultadoUsuario.textContent = "Usuario no registrado.";
};
