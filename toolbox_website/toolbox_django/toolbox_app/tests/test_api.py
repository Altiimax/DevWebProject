from rest_framework.test import APITestCase, APIClient
import base64

class TestApi(APITestCase):

    def setUp(self):
        self.client = APIClient() #HTTP_HOST='127.0.0.1:8000'
        self.client.login(username='admin',password='devweb2')
        self.credentials = base64.b64encode('admin:devweb2'.encode('utf-8'))
        print(self.credentials) # Après vérif avec postman, les credentials sont bien correcte...
        self.client.credentials(HTTP_AUTHORIZATION='Basic {}'.format(self.credentials.decode('utf-8')))

    def test_personsViewSet_list_GET(self):
        response = self.client.get('/api/persons/', format='json')
        print(response.content)
        print(response.client)
        print(response.context)
        print(response.request)
        self.assertEqual(response.status_code,200)