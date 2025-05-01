from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def home_view(request):
    return render(request, 'home/home.html')

@login_required
def dashboard_view(request):
    return render(request, 'home/dashboard.html')