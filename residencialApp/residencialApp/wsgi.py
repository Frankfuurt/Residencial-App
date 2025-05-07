import os
import sys
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# Establece el path al directorio raíz del proyecto
PROJECT_ROOT_DJANGO = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT_DJANGO) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT_DJANGO))

# Establece el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'residencialApp.settings')

# Aplica la configuración de WSGI
application = get_wsgi_application()
