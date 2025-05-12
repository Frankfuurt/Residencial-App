from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User
from home.Helpers import map_houses
from user_management.models import UserProfile
from django.views.decorators.http import require_GET

@login_required
def home_view(request):
    return render(request, 'home/home.html')

@login_required
def dashboard_view(request):
    return render(request, 'home/dashboard.html')

@login_required
def users_view(request):
    users = User.objects.all()  # Obtener todos los usuarios
    return render(request, 'home/users.html', {'users': users})

@login_required
def map_view(request):
    items = []
    items = map_houses
    return render(request, 'home/map.html', {'items': items})


@require_GET
def get_profile_information_view(request):
    print("get_profile_information_view")
    condominio = request.GET.get('condominio', '')
    casa = request.GET.get('casa', '')

    # Filtramos los perfiles por condominio y casa
    perfiles = UserProfile.objects.filter(condominio__icontains=condominio, casa__icontains=casa)
    
    # Creamos la respuesta para devolverla
    data = []
    for perfil in perfiles:
        data.append({
            'username': perfil.user.username,
            'condominio': perfil.condominio,
            'casa': perfil.casa,
            #'foto_url': perfil.foto.url if perfil.foto else '',
        })

        print(str(data))

    return JsonResponse({'perfiles': data})