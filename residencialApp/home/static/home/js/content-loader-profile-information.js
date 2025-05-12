document.addEventListener('DOMContentLoaded', () => {

    const initializeMapFunctionality = () => {
        const element = document.querySelector('#elementSelector');
        if (element) {
            element.addEventListener('change', () => {
                buscarPerfil();
            });
        }
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
    })
});

function buscarPerfil() {
    const condominio = document.getElementById('elementSelector-condominio').value;
    const casa = document.getElementById('elementSelector').value;

    fetch(`/get-profile/?condominio=${condominio}&casa=${casa}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el perfil');
            }
            return response.json();
        })
        .then(data => {
            const errorBox = document.getElementById('error');
            const infoBox = document.getElementById('perfil-info');

            // Verificar si la respuesta tiene un error
            if (data.error) {
                errorBox.textContent = data.error;
                errorBox.style.display = 'block';
                infoBox.style.display = 'none';
            } else {
                errorBox.style.display = 'none';

                // Asegurarse de que estamos accediendo al primer objeto en el array
                const perfil = data.perfiles[0];
                console.log('perfil:', perfil);
                document.getElementById('username').textContent = perfil.username;
                document.getElementById('condominio_valor').textContent = perfil.condominio;
                document.getElementById('casa_valor').textContent = perfil.casa;

                if (perfil.foto_url) {
                    document.getElementById('foto_container').innerHTML = `<img src="${perfil.foto_url}" class="ui small rounded image">`;
                } else {
                    document.getElementById('foto_container').innerHTML = '';
                }

                infoBox.style.display = 'block';
            }
        })
        .catch(error => {
            const errorBox = document.getElementById('error');
            const infoBox = document.getElementById('perfil-info');

            errorBox.textContent = error.message;
            errorBox.style.display = 'block';
            infoBox.style.display = 'none';
        });
}
