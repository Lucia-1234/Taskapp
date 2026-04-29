const url = "http://localhost:3000/";

export const delet = async(endpoint, data) => {
    try {
        const respuesta = await fetch(`${url}${endpoint}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json", // Inform server of data format
            },
            body: JSON.stringify(data),
        });
        
        if (!respuesta.ok) {
        throw new Error(`Error GET: ${respuesta.status} ${respuesta.statusText}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}