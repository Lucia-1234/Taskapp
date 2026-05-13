import { url } from "./config.js"

export const delet = async(endpoint, data) => {
    try {
        const respuesta = await fetch(`${url}${endpoint}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json", // Inform server of data format
            }
        });
        
        if (!respuesta.ok) {
        throw new Error(`Error DELETE: ${respuesta.status} ${respuesta.statusText}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}