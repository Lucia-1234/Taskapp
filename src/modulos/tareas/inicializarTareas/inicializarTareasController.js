import { inicializarBusquedaUsuario } from '@/modulos/usuarios/index.js';
import { inicializarCrearTarea } from '@/modulos/tareas/crearTarea/index.js';
import { mostrarVistaTareas } from '@/modulos/tareas/mostrarTareas/index.js';
import { inicializarFormEdicion } from '@/modulos/tareas/editarTarea/index.js';
import { obtenerTareasVisibles } from '@/modulos/tareas/listarTareas/index.js';
import { descargarTareasJSON } from '@/helpers/utils/exportarTareas.js';
import { notificarExito, notificarError, notificarInfo } from '@/modulos/notificaciones/index.js';

let usuarioActual = null;

export const inicializarTareas = () => {
    inicializarBusquedaUsuario((usuario) => {
        usuarioActual = usuario;
        mostrarVistaTareas(usuario);
    });

    inicializarCrearTarea(() => usuarioActual);
    inicializarFormEdicion(() => usuarioActual);

    const btnExportar = document.querySelector("#btnExportarTareas");
    
    if (btnExportar) {
        btnExportar.addEventListener("click", () => {
            const tareas = obtenerTareasVisibles();
            
            if (!tareas || tareas.length === 0) {
                notificarInfo("No hay tareas visibles para exportar.");
                return;
            }
            
            try {
                descargarTareasJSON(tareas);
                notificarExito(`Se exportaron ${tareas.length} tareas correctamente.`);
            } catch (error) {
                console.error("Error al exportar tareas:", error);
                notificarError("Ocurrió un error al intentar exportar las tareas.");
            }
        });
    }
};
