from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.models import User

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
    for i in range(1, 16):  # del 1 al 15
        item = {
            'id': i,
            'condominio': 'Condominio 2-',
            'top': round(84.6 - (i - 1) * 2.2, 1),
            'left': round(68.5 - (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(16, 31):  # del 16 al 30
        item = {
            'id': i,
            'condominio': 'Condominio 2-',
            'top': round(20.4 + (i - 1) * 2.2, 1),
            'left': round(70.5 + (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(1, 18):  # del 1 al 17
        item = {
            'id': i,
            'condominio': 'Condominio 1-',
            'top': round(40.8 - (i - 1) * 2.2, 1),
            'left': round(64.2 - (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(18, 35):  # del 18 al 34
        item = {
            'id': i,
            'condominio': 'Condominio 1-',
            'top': round(-32.5 + (i - 1) * 2.2, 1),
            'left': round(65.5 + (i - 1) * 0.2, 1),
        }
        items.append(item)

    
    return render(request, 'home/map.html', {'items': items})