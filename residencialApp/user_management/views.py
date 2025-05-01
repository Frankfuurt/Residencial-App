from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import UserProfile
from .forms import CustomUserCreationForm#,UserProfileForm

# Registro de usuarios
def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user)  # Crear perfil automáticamente
            login(request, user)
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

# Login de usuarios
def user_login(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'Credenciales inválidas'})
    return render(request, 'login.html')

# Logout de usuarios
def user_logout(request):
    logout(request)
    return redirect('login')

# Perfil de usuario
@login_required
def profile(request):
    return render(request, 'profile.html', {'profile': request.user.userprofile})
