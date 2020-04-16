from django.test import TestCase, Client
from django.urls import reverse

def test_index():
    client = Client()
    response = client.get(reverse('index'))
    assert response.status_code == 200