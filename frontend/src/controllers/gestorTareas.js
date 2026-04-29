import { enviar, obtener } from '../helpers/index.js';
import { taskCard } from '../components/taskCard.js';

// Variables globales de este módulo
// Guardará la información del usuario actual una vez que se encuentre en la búsqueda
let usuarioActual = null;
// Llevará la cuenta de cuántas tareas hemos agregado a la interfaz
let contadorTareas = 0;

/**
 * 
 * Cargar tareas desde el servidor 
 * cumple con la terea tecnica 1 y 2
 */

export const cargarTareasServidor = async (userId) => {
  const tasksContainer = document.querySelector('#tasksContainer');
  const taskCount = document.querySelector('#taskCount');

  if (!tasksContainer) return; // Validación de seguridad

  try {
    //1. obtener las tareas del usuario desde el servidor usando el helper 'obtener' (método GET)
    const tareas = await obtener('task?userId=${userId}');

    //2.  Limpiamos el contenedor antes de agregar las tareas
    tasksContainer.innerHTML = '';
    // Reiniciamos el contador 
    contadorTareas = 0; 

    //3. Si el servidor devuelve tareas, las recorremos y creamos una tarjeta para cada una usando el componente 'taskCard'
    if (tareas && tareas.length > 0) {
      tareas.forEach(tarea => {
        // Llamamos a la función 'taskCard' que devuelve un elemento HTML con la información de la tarea
        const tarjeta = taskCard(tarea);
        tasksContainer.appendChild(tarjeta);
        contadorTareas++;
      });
    } else {
      // Si no hay tareas, mostramos un mensaje informativo en el contenedor
      tasksContainer.innerHTML = '<p class="info-empty"> Este usuario no tiene tareas registradas aún. </p>';
    }

    
    // 4. Actualizamos el contador visual en pantalla con la cantidad de tareas obtenidas, y agregamos una 's' al texto si no es 1 (plural vs singular)
    if (taskCount) {
      taskCount.textContent = `${contadorTareas} tarea${contadorTareas !== 1 ? 's' : ''}`;
    } 
  } catch (error) {
    // Si la petición falla (por ej. si se cae el internet), capturamos el error y mostramos un mensaje de error en el contenedor
    console.error('Error al cargar las tareas:', error);
    // REQUISITO 2: Registro de tareas -> Manejar errores de conexión al servidor mostrando un mensaje de error en el contenedor de tareas.
    tasksContainer.innerHTML = '<p style="color: var(--color-error)">Error al conectar con el servidor.</p>';
  }
};

/**
 * Función: inicializarVistaTareas
 * Propósito: Configurar el evento de envío (submit) del formulario de registro de tareas.
 */
export const inicializarVistaTareas = () => {
  // Seleccionamos el formulario de tareas por su ID
  const formTarea = document.querySelector('#formTarea');
  // Si no se encuentra en el HTML, detenemos la ejecución
  if (!formTarea) return;

  // Escuchamos el evento 'submit' que se dispara al presionar el botón "Registrar Tarea"
  formTarea.addEventListener('submit', async (evento) => {
    // REQUISITO 2: Registro de tareas -> Enviar la información de la tarea sin recargar la página.
    // Usamos preventDefault para evitar la recarga automática del navegador
    evento.preventDefault();
    
    // Si la variable 'usuarioActual' está vacía (null), no permitimos continuar
    if (!usuarioActual) return;

    // Obtenemos las referencias a los 3 campos del formulario usando sus IDs
    const tituloInput = document.querySelector('#tareaTitulo');
    const descInput = document.querySelector('#tareaDescripcion');
    const estadoInput = document.querySelector('#tareaEstado');

    // Construimos el objeto con la información de la nueva tarea
    const nuevaTarea = {
      title: tituloInput.value.trim(),           // Título (sin espacios extra a los lados)
      description: descInput.value.trim(),       // Descripción
      status: estadoInput.value,                 // Estado (pendiente, progreso, completada)
      // REQUISITO 2: Registro de tareas -> Asociar la tarea al usuario correspondiente.
      // Aquí tomamos el 'id' del usuario que buscamos previamente y se lo asignamos a la tarea
      userId: usuarioActual.id,
      // Propiedad extra para mantener compatibilidad con JSONPlaceholder
      completed: estadoInput.value === 'completada' 
    };

    // REQUISITO 2: Registro de tareas -> Validar que todos los campos del formulario de tareas estén completos.
    // Comprobamos en JavaScript si el título o la descripción están en blanco
    // (A esto se suma que en HTML también pusimos el atributo 'required')
    if (!nuevaTarea.title) {
      alert('El titulo de la tarea esta vacio; Por favor ingrese un titulo para la tarea'); // Mostramos una alerta al usuario
      return; // Detenemos el código aquí, no se envía nada al servidor
    }
    if (!nuevaTarea.description) {
      alert('PLa descripcion de la tarea esta vacia; Por favor ingrese una descripcion para la tarea.'); // Mostramos una alerta al usuario
      return; // Detenemos el código aquí, no se envía nada al servidor
    }

    if (nuevaTarea.title && nuevaTarea.description){
      alert('La tarea fue Agregada con exito')
    }

    try {
      // Usamos el helper 'enviar' (método POST) para mandar los datos al servidor (JSONPlaceholder)
      const resultado = await enviar('task', nuevaTarea);

      formTarea.reset();

    } catch (error) {
      // Si la petición falla (por ej. si se cae el internet), capturamos el error
      console.error('Error al registrar la tarea:', error);
      alert('Hubo un error al registrar la tarea. Intenta nuevamente.');
    }
  });
};


/**
 * Función: manejarCambioUsuario
 * Propósito: Habilitar o deshabilitar el formulario de tareas dependiendo de si el usuario existe.
 * 
 * @param {Object|null} usuario - El usuario encontrado o null.
 */
export const manejarCambioUsuario = (usuario) => {
  // Obtenemos los elementos que contienen el formulario de tareas y la lista visual de tareas
  const taskSection = document.querySelector('#taskSection');
  const tasksListSection = document.querySelector('#tasksListSection');
  const tasksContainer = document.querySelector('#tasksContainer');
  const taskCount = document.querySelector('#taskCount');

  // Guardamos globalmente el usuario en este módulo para usarlo al registrar la tarea
  usuarioActual = usuario;

  // Si 'usuario' contiene información (es diferente de null)
  if (usuario) {
    // REQUISITO 2: Registro de tareas -> Habilitar el formulario de registro de tareas únicamente cuando el usuario haya sido encontrado.
    // Le quitamos la clase CSS 'hidden' (que tiene display:none) para hacerlos visibles
    taskSection.classList.remove('hidden');
    tasksListSection.classList.remove('hidden');

    cargarTareasServidor(usuario.id); // Cargamos las tareas del usuario encontrado para mostrarlas en pantalla
    
    // Vaciamos el contenedor de tarjetas por si acaso pertenecían al usuario anterior
    // if (tasksContainer) tasksContainer.innerHTML = '';
    // Reiniciamos el contador de tareas a cero
    contadorTareas = 0;
    // Actualizamos el contador visual en pantalla
    if (taskCount) taskCount.textContent = '0 tareas';
  } else {
    // REQUISITO 2: Registro de tareas -> Si el usuario no fue encontrado (o se buscó uno inválido)
    // Agregamos la clase 'hidden' para ocultar por completo el formulario y la lista
    taskSection.classList.add('hidden');
    tasksListSection.classList.add('hidden');
  }
};

