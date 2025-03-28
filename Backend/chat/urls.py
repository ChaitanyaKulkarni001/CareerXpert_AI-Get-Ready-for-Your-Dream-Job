from django.urls import path
from .views import  peer

urlpatterns = [
    path('', peer, name='peer'),
    ]