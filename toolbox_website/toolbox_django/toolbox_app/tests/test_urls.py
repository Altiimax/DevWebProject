from django.urls import reverse, resolve
from ..views import *

def test_index():
    url = reverse('index')
    assert resolve(url).func == index