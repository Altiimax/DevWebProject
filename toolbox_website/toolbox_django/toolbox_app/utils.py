from .serializers import personsSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': personsSerializer(user, context={'request': request}).data
    }