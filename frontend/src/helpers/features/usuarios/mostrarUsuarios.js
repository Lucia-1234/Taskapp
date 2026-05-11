export const mostrarUsuario = (usuario) => {

    const resultadoUsuario =document.querySelector("#resultadoUsuario");

    if (!resultadoUsuario) return;

    if (usuario) {

        resultadoUsuario.className ="texto--exito";

        resultadoUsuario.textContent =`Usuario encontrado: ${usuario.name}`;

    } else {

        resultadoUsuario.className ="texto--error";

        resultadoUsuario.textContent ="Usuario no registrado.";

    }

}