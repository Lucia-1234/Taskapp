/**
 * Archivo: index.js (App Principal)
 * Propósito: Actuar como el punto de inicio (entry point) de la aplicación, conectando las diferentes vistas.
 */
import { taskCard } from '../components/taskCard.js';
import { obtener } from '../helpers/get.js';
import { inicializarBusquedaUsuario } from '../controllers/buscarUsuario.js';
import { inicializarVistaTareas, manejarCambioUsuario } from '../controllers/gestorTareas.js';

console.log('Aplicación iniciada (Módulo App)');

// Como index.js se carga con type="module", el navegador ya sabe que 
// debe esperar a que el HTML (DOM) esté construido antes de ejecutar este código.
// Por lo tanto, no necesitamos usar DOMContentLoaded.

// 1. Inicializamos la vista de tareas
  inicializarVistaTareas();  

// 2. Inicializamos la vista de usuarios.
inicializarBusquedaUsuario((usuario) => {
  // Cuando la vista de usuarios encuentre o no a alguien, nos pasará el resultado aquí
  manejarCambioUsuario(usuario);
});

const form = document.querySelector("#formUsuario");
const userId = document.querySelector("#usuarioId")
const tareas = await obtener("task")
const tareaContainer = document.querySelector(".messages-container")


form.addEventListener("submit", e => {
  e.preventDefault();
  tareaContainer.innerHTML = "";
  tareas.forEach(tarea => {

    if (tarea.userId != userId.value) {
      console.log("no")
      return;
    }
    const tarjeta = taskCard(tarea);
    tareaContainer.append(tarjeta)
    console.log("container después:", tareaContainer.innerHTML)
    
  })
})