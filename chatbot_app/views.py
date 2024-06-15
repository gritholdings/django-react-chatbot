from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Prompt
from .serializers import PromptSerializer
from .llm import openai_instance


class PromptView(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer


@api_view(['GET', 'POST'])
def chat(request):
    if request.method == 'POST':
        message = request.data.get('message')
        response = openai_instance.chat(message=message)
        return Response(response, status=status.HTTP_200_OK)
