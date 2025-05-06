console.log('map.js cargado correctamente');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado');

    const initializeMapFunctionality = () => {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) {
            console.log('map.html no está cargado, deteniendo ejecución de map.js');
            return;
        }

        console.log('map.html detectado, inicializando funcionalidad de map.js');

        const container = document.getElementById('dashboard-container');
        if (!container) {
            console.error('No se encontró el contenedor dashboard-container');
            return;
        }

        const dropdown_condominio = container.querySelector('#elementSelector-condominio');
        const dropdown_casa = container.querySelector('#elementSelector');
        if (!dropdown_casa) {
            console.error('El combo elementSelector no se encuentra en el DOM');
            return;
        }

        console.log('Combo elementSelector encontrado:', dropdown_casa);

        dropdown_casa.addEventListener('change', () => {
            console.log('Evento change disparado para:', dropdown_casa.value);
            console.log('Evento change disparado para:', dropdown_condominio.value);

            // Cambiar la clase de las etiquetas seleccionadas
            container.querySelectorAll('.number.selected').forEach(el => el.classList.remove('selected'));

            const selectedValue = dropdown_condominio.value + dropdown_casa.value;
            console.log('Valor seleccionado:', selectedValue);
            const correspondingNumber = container.querySelector(`.number[data-id="${selectedValue}"]`);
            if (correspondingNumber) {
                correspondingNumber.classList.add('selected');
                console.log('Número resaltado en amarillo:', correspondingNumber);
            } else {
                console.warn('No se encontró un número correspondiente para:', selectedValue);
            }
        });

        populateElementSelector('elementSelector-condominio', 'elementSelector');
    };

    const observeMapSelection = () => {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.getElementById('map-container')) {
                initializeMapFunctionality();
                obs.disconnect(); // Detener la observación después de inicializar
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    // Escuchar clics en el menú para seleccionar "Mapa Residencial"
    const menuItems = document.querySelectorAll('.item'); // Ajusta el selector según tu estructura de menú
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'map') { // Ajusta el ID según corresponda
                observeMapSelection();
            }
        });
    });
});

function populateElementSelector(condominioSelectorId, elementSelectorId) {
    const condominioSelector = document.getElementById(condominioSelectorId);
    const elementSelector = document.getElementById(elementSelectorId);

    condominioSelector.addEventListener('change', function() {
        const condominio = this.value;

        // Clear existing options
        elementSelector.innerHTML = '<option value="">Selecciona un número</option>';

        // Populate options based on selected condominio
        let maxNumber = 0;
        if (condominio === 'Condominio 1-') {
            maxNumber = 34;
        } else if (condominio === 'Condominio 2-') {
            maxNumber = 30;
        }

        for (let i = 1; i <= maxNumber; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            elementSelector.appendChild(option);
        }
    });
}