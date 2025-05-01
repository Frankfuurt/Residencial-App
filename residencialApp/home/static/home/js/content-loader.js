// Function to load content dynamically into a specified container
document.addEventListener('DOMContentLoaded', () => {
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
                container.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    };
});