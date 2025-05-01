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