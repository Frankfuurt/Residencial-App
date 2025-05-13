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
    const numero = document.getElementById('elementSelector-condominio').value;
    const condominio = numero.match(/\d+/);

    const casa = document.getElementById('elementSelector').value;

    fetch(`/get-profile/?condominio=${condominio[0]}&casa=${casa}`)
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

                // Asegurar que el tamaño de la imagen sea fijo, independientemente de si hay foto o no
                const fixedImageHTML = `<img src="/static/home/images/noImage.png" class="fixed-size-img ui small rounded image autumn leaf" style="width: 290px; height: 216.203px;">`;

                // Asegurarse de que estamos accediendo al primer objeto en el array
                const perfil = data.perfiles[0];
                console.log('perfil:', perfil);

                // si perfil vacio o indefinido return  
                if (!perfil || perfil.length == 0) {
                    document.getElementById('username').textContent = ''
                    document.getElementById('condominio_valor').textContent = ''
                    document.getElementById('casa_valor').textContent = ''
                    document.getElementById('foto_container').innerHTML = fixedImageHTML;

                    // Agregar efecto de transición de Semantic UI
                    $('.autumn.leaf').transition({
                        animation: 'fade in down',
                        duration: 800,
                        onStart: function () {
                            $(this).show(); // por si acaso estaba oculto
                        }
                    });

                    return
                }

                document.getElementById('username').textContent = perfil.first_name + ' ' + perfil.last_name;
                document.getElementById('name2').innerText = perfil.first_name + ' ' + perfil.last_name;
                document.getElementById('username2').innerText = perfil.username;
                document.getElementById('condominio_valor').innerText = perfil.condominio;
                document.getElementById('casa_valor').innerText = perfil.casa;
                document.getElementById('telephone').innerText = perfil.phone_number;
                document.getElementById('telephone_valor').innerText = perfil.phone_number;
                document.getElementById('email_valor').innerText = perfil.email;
                document.getElementById('email').innerText = perfil.email;
                document.getElementById('bio').innerText = perfil.bio;
                document.getElementById('bio_valor').innerText = perfil.bio;
                document.getElementById('created_at').innerText = `Registrado: ` + perfil.created_at;
                document.getElementById('created_at_valor').innerText = perfil.created_at;

                if (perfil.foto_url) {
                    document.getElementById('foto_container').innerHTML = `<img src="${perfil.foto_url}" class="fixed-size-img ui small rounded image autumn leaf" style="width: 290px; height: 260px;">`;
                } else {
                    document.getElementById('foto_container').innerHTML = fixedImageHTML;
                }

                // Agregar efecto de transición de Semantic UI
                $('.autumn.leaf').transition({
                    animation: 'fade in down',
                    duration: 800,
                    onStart: function () {
                        $(this).show(); // por si acaso estaba oculto
                    }
                });

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
