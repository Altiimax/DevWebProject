# sources à ajouter :
# testunitaire et test d'int : https://stackoverflow.com/questions/5917587/django-unit-tests-without-a-db 

from django.test import SimpleTestCase
from ..serializers import *

class test_townsRelatedSerializers(SimpleTestCase):

    def test_countriesSerializer(self):
        dummy_dict = {'id_countryCode': 'PL', 'countryName':'Poland'} 
        serializer = countriesSerializer(data=dummy_dict)
        print(serializer.initial_data)
        self.assertEqual("A", "A")

    