from django.shortcuts import render
from rest_framework import viewsets
from .models import Prompt
from .serializers import PromptSerializer


class PromptView(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
