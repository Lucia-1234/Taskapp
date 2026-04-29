import { obtener } from '../helpers/index.js';

/**
 * Función: inicializarBusquedaUsuario
 * Propósito: Inicializar el evento de búsqueda de un usuario cuando se envía el formulario.
 */
export const inicializarBusquedaUsuario = (alEncontrarUsuario) => {
  // Seleccionamos el formulario de búsqueda de usuario usando querySelector
  const formUsuario = document.querySelector('#formUsuario');
  // Seleccionamos el elemento donde mostraremos los mensajes (éxito o error)
  const resultadoUsuario = document.querySelector('#resultadoUsuario');
  
  // Si no existe el formulario en el HTML, detenemos la ejecución aquí
  if (!formUsuario) return;

  // REQUISITO 1: Búsqueda del usuario -> Capturar el evento de envío del formulario
  formUsuario.addEventListener('submit', async (evento) => {
    // REQUISITO 1: Búsqueda del usuario -> ...sin recargar la página.
    // preventDefault detiene el comportamiento por defecto del formulario (recargar)
    evento.preventDefault();
    
    // Obtenemos el campo de texto del ID del usuario
    const usuarioIdInput = document.querySelector('#usuarioId');
    // Validamos que el input exista y que el usuario haya escrito algo (evitando espacios vacíos)
    if (!usuarioIdInput || !usuarioIdInput.value.trim()) return;
    
    // Guardamos el ID limpio (sin espacios en blanco extra) en una variable
    const usuarioId = usuarioIdInput.value.trim();
    
    // Mostramos un mensaje temporal para indicar al usuario que la búsqueda está en proceso
    resultadoUsuario.textContent = 'Buscando usuario...';
    // Le aplicamos un color gris (texto secundario) mientras carga
    resultadoUsuario.style.color = 'var(--color-text-secondary)';

    try {
      // REQUISITO 1: Búsqueda del usuario -> Consultar el servidor para verificar si el usuario existe.
      // Usamos el helper 'obtener' (get) para pedir la información a la API usando el ID
      const usuario = await obtener(`users/${usuarioId}`);
      
      // Verificamos si el servidor nos devolvió un usuario real (que tenga la propiedad 'id')
      if (usuario && usuario.id) {
        // REQUISITO 1: Búsqueda del usuario -> Mostrar en pantalla los datos del usuario encontrado en campos previamente definidos.
        // Cambiamos el color del texto a verde (éxito)
        resultadoUsuario.style.color = 'var(--color-success)';
        // Insertamos el nombre y el correo del usuario en el contenedor de resultados
        resultadoUsuario.textContent = `Usuario encontrado: ${usuario.name} | Estado: ${usuario.active}`;
        
        // Llamamos a la función callback avisando al resto del sistema que sí encontramos a alguien
        if (typeof alEncontrarUsuario === 'function') {
          alEncontrarUsuario(usuario); // Pasamos el usuario completo
        }
      } else {
        // Si no tiene 'id', forzamos un error para que vaya al bloque 'catch'
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      // REQUISITO 1: Búsqueda del usuario -> Si el usuario no existe, mostrar un mensaje indicando que no está registrado en el sistema.
      // Si la API arroja un error 404 (No Encontrado), el código saltará automáticamente aquí.
      
      // Cambiamos el color del texto a rojo (error)
      resultadoUsuario.style.color = 'var(--color-error)';
      // Mostramos el mensaje exacto que pide el requisito
      resultadoUsuario.textContent = 'Usuario no registrado en el sistema.';
      
      // Llamamos a la función callback pero pasamos 'null' para avisar que nadie fue encontrado
      if (typeof alEncontrarUsuario === 'function') {
        alEncontrarUsuario(null); 
      }
    }
  });
};
