from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('users/', views.users_view, name='users'),
    path('map/', views.map_view, name='map'),
]