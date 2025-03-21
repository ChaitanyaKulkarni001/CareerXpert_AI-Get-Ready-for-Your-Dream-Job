from django.shortcuts import render

from .utils import get_turn_info
from django.http import JsonResponse
# Create your views here.

def peer(request):
    # get numb turn info
    context = get_turn_info()
    print('context: ', context)

    # return Jsom context=context)
    return render(request, 'chat/peer.html', context=context)

def main(request):
    context = get_turn_info()
    print('context: ', context)

    return render(request, 'main.html', context=context)