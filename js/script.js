
// Cargar los datos de la galería desde el CMS
async function cargarGaleria() {
    try {
        // Cargar configuración de la galería
        const respuestaConfig = await fetch('/content/config.md');
        const configText = await respuestaConfig.text();
        const config = parsearMarkdown(configText);
        
        // Actualizar título y descripción
        document.getElementById('titulo-galeria').textContent = config.titulo || 'Mi Galería';
        document.getElementById('descripcion-galeria').textContent = config.descripcion || 'Las mejores fotos';

        // Cargar las fotos
        const contenedor = document.getElementById('contenedor-galeria');
        contenedor.innerHTML = ''; // Limpiar contenedor

        // Obtener lista de archivos en la galería (esto es una simplificación)
        const fotos = await obtenerFotos();
        
        fotos.forEach(foto => {
            const divFoto = document.createElement('div');
            divFoto.className = 'item-galeria';
            divFoto.innerHTML = `
                <img src="${foto.imagen}" alt="${foto.titulo}">
                <h3>${foto.titulo}</h3>
            `;
            contenedor.appendChild(divFoto);
        });

    } catch (error) {
        console.error('Error cargando la galería:', error);
        document.getElementById('contenedor-galeria').innerHTML = 
            '<p>Error cargando la galería. Intenta recargar la página.</p>';
    }
}

// Función para parsear el markdown del CMS (simplificada)
function parsearMarkdown(texto) {
    const lineas = texto.split('\n');
    const datos = {};
    
    lineas.forEach(linea => {
        const [clave, valor] = linea.split(':');
        if (clave && valor) {
            datos[clave.trim()] = valor.trim();
        }
    });
    
    return datos;
}

// Función simulada para obtener fotos (en un caso real, buscaría en la carpeta de galería)
async function obtenerFotos() {
    try {
        // Esta sería la forma real de obtener las fotos dinámicamente
        // Por ahora simulamos con datos estáticos para prueba
        return [
            {
                titulo: "Foto de ejemplo 1",
                imagen: "/img/placeholder1.jpg"
            },
            {
                titulo: "Foto de ejemplo 2", 
                imagen: "/img/placeholder2.jpg"
            }
        ];
    } catch (error) {
        return [];
    }
}

// Cargar la galería cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarGaleria);