from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def root_route(request):
    """"
    Add the root route
    """
    return Response({'message': 'Welcome to Worth a Trip!'})
