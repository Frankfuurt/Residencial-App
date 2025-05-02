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
                //history.pushState(null, '', url);  // Cambia la URL del navegador
                //updateActiveMenu();               // Actualiza el ítem activo en el menú
                container.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    };

    // Soporte para botón Atrás/Adelante del navegador
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname, containerId);
    });
});
