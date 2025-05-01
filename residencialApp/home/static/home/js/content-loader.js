document.addEventListener('DOMContentLoaded', () => {
    function handlePanelAdministrativoClick() {
        fetch('/dashboard/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar la página del dashboard');
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById('dashboard-container');
                if (container) {
                    container.innerHTML = html;
                    container.style.display = 'block'; // Asegurarse de que el contenedor sea visible
                } else {
                    console.error('No se encontró el contenedor para el dashboard');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    window.handlePanelAdministrativoClick = handlePanelAdministrativoClick;

    // Aquí puedes agregar el evento para el botón o enlace que activa el panel administrativo
    // Por ejemplo:
    // document.getElementById('mi-boton').addEventListener('click', handlePanelAdministrativoClick);
});