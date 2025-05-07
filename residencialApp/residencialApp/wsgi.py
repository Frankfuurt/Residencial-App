import os
import sys
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# Establece el path al directorio raíz del proyecto (sube dos niveles)
PROJECT_ROOT_DJANGO = Path(__file__).resolve().parent.parent  # Subimos dos niveles para llegar a la raíz del proyecto

# Añadimos la raíz del proyecto al sys.path
if str(PROJECT_ROOT_DJANGO) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT_DJANGO))

# Establecemos la variable de entorno para el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'residencialApp.settings')  # Ruta completa

# Aplica la configuración de WSGI
application = get_wsgi_application()
