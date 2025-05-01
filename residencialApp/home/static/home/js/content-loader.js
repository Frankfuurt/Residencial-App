// Function to load content dynamically into a specified container
document.addEventListener('DOMContentLoaded', () => {
    const containerId = 'dashboard-container';

    window.loadPage = function (url, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found.`);
            return;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                history.pushState(null, '', url);  // Cambia la URL del navegador
                updateActiveMenu();               // Actualiza el ítem activo en el menú
                container.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    };

    // Mapea rutas base a IDs del menú
    const routeToIdMap = {
        '/dashboard/': 'panel-administrativo',
        '/contacto/': 'menu-contacto',
        '/calendario/': 'menu-calendario',
        '/users/': 'panel-administrativo', // ya que users esta dentro del panel administrativo por eso mando panel-administrativo
    };

    // Función para actualizar el menú activo según la URL
    window.updateActiveMenu = function () {
        const path = window.location.pathname;

        // Remueve 'active' de todos los ítems del menú
        document.querySelectorAll('.ui.menu .item').forEach(item => {
            item.classList.remove('active');
        });

        // Busca coincidencia de ruta y aplica 'active'
        for (const [route, id] of Object.entries(routeToIdMap)) {
            if (path.startsWith(route)) {
                const menuItem = document.getElementById(id);
                if (menuItem) {
                    menuItem.classList.add('active');
                }
                break;
            }
        }
    };

    // Ejecuta una vez al cargar la página para marcar el menú activo
    updateActiveMenu();

    // Si se accede directamente a una ruta embedida, cargar su contenido automáticamente
    const path = window.location.pathname;
    for (const route of Object.keys(routeToIdMap)) {
        if (path.startsWith(route)) {
            loadPage(path, containerId);
            break;
        }
    }

    // Soporte para botón Atrás/Adelante del navegador
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname, containerId);
    });
});
