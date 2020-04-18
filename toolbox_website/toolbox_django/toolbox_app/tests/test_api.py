from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
import json

from ..models import *

class SetupClass(APITestCase):

    def setUpTest(self):
        self.username = 'admin'
        self.password = 'devweb2'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        
        #Client with basic auth credentials
        self.auth_client = APIClient()
        self.auth_client.login(username=self.username, password=self.password)
        
        #Client w/o basic auth credentials
        self.not_auth_client = APIClient()

        #Creating dummy objects
        ## person
        self.dummyPerson_dict = {
            "lastName": "foo",
            "firstName": "bar",
            "alias": "fobar",
            "birthDate": "1000-12-01",
            "email": "foo.bar@gmail.com",
            "pwd_test": "testpwd2"
        }
        self.dummyPerson_object = Persons.objects.create(**self.dummyPerson_dict)
        self.dummyPerson_object_id = self.dummyPerson_object.id_person

        ## country
        self.dummyCountry_dict = {
            "id_countryCode": "BE",
            "countryName": "Belgium"
        }
        self.dummyCountry_object = Countries.objects.create(**self.dummyCountry_dict)

        ## town
        self.dummyTown_dict = {
            "postCode": 1300,
            "townName": "Wavre",
            "id_countryCode": self.dummyCountry_object
        }
        self.dummyTown_object = Towns.objects.create(**self.dummyTown_dict)
        self.dummyTown_object_id = self.dummyTown_object.id_town

        ## tool
        self.dummyTool_dict = {
            "id_person": self.dummyPerson_object,
            "toolName": "TESTTSTTS",
            "toolDescription": "Saute super bien!",
            "toolPrice": "18.32"
        }
        self.dummyTool_object = Tools.objects.create(**self.dummyTool_dict)
        self.dummyTool_object_id = self.dummyTool_object.id_tool

        ## group
        self.dummyGroup_dict = {
            "id_groupName": "TestGroup4",
            "groupType": "public",
            "groupRange": 50,
            "id_town": self.dummyTown_object
        }
        self.dummyGroup_object = Groups.objects.create(**self.dummyGroup_dict)
        self.dummyGroup_object_id = self.dummyGroup_object.id_groupName


class TestPersonsApi(SetupClass):

    def setUp(self):
        self.setUpTest()

    def test_personsViewSet_list_GET(self):
        response = self.auth_client.get("/api/persons/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_personsViewSet_list_GET_noAuth(self):
        response = self.not_auth_client.get("/api/persons/", format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_personsViewSet_detail_GET(self):
        response = self.auth_client.get("/api/persons/1/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_personsViewSet_POST(self):
        data = {
            "lastName": "foo2",
            "firstName": "bar2",
            "alias": "fobar2",
            "birthDate": "1000-12-01",
            "email": "foo2.bar2@gmail.com",
            "pwd_test": "testpwd22"
        }
        response = self.auth_client.post("/api/persons/", data ,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_personsViewSet_aliases_GET(self):
        response = self.auth_client.get("/api/persons/aliases/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_personsViewSet_login_GET(self):
        #With correct email
        response = self.auth_client.get("/api/persons/login/?email=foo.bar@gmail.com", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)[0].get("email"), self.dummyPerson_dict.get("email"))
        self.assertEqual(json.loads(response.content)[0].get("pwd_test"), self.dummyPerson_dict.get("pwd_test"))
        
        #With incorrect email
        response = self.auth_client.get("/api/persons/login/?email=fakefoo.bar@gmail.com", format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content).get("error"), "no user with this email: fakefoo.bar@gmail.com")

    def test_personsViewSet_towns_GET(self):
        response = self.auth_client.get("/api/persons/1/towns/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_personsViewSet_towns_Post(self):
        data = {
            "id_town":"%s"%self.dummyTown_object_id
        }
        response = self.auth_client.post("/api/persons/%s/towns/"%self.dummyPerson_object_id, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_personsViewSet_tools_GET(self):
        response = self.auth_client.get("/api/persons/%s/tools/"%self.dummyPerson_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_personsViewSet_tools_Post(self):
        data = {
            "toolName": "Scie Circulaire",
            "toolDescription": "Bon état!",
            "toolPrice": "9.32"
        }
        response = self.auth_client.post("/api/persons/%s/tools/"%self.dummyPerson_object_id, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_personsViewSet_reviews_GET(self):
        response = self.auth_client.get("/api/persons/%s/reviews/"%self.dummyPerson_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_personsViewSet_reviews_Post(self):
        data = {
            "stars": 8,
            "comment": "very nice person"
        }
        response = self.auth_client.post("/api/persons/%s/reviews/"%self.dummyPerson_object_id, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_personsViewSet_groups_GET(self):
        response = self.auth_client.get("/api/persons/%s/groups/"%self.dummyPerson_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    


class TestToolsApi(SetupClass):

    def setUp(self):
        self.setUpTest()

    def test_toolsViewSet_list_GET(self):
        response = self.auth_client.get("/api/tools/", format='json')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_toolsViewSet_images_GET(self):
        response = self.auth_client.get("/api/tools/%s/images/"%self.dummyTool_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reviewsViewSet_images_GET(self):
        response = self.auth_client.get("/api/tools/%s/reviews/"%self.dummyTool_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reviewsViewSet_images_POST(self):
        data = {
            "stars": 7,
            "comment": "NC",
        }
        response = self.auth_client.post("/api/tools/%s/reviews/"%self.dummyTool_object_id, data, format='json')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_groupsViewSet_images_GET(self):
        response = self.auth_client.get("/api/tools/%s/groups/"%self.dummyTool_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGroupsApi(SetupClass):

    def setUp(self):
        self.setUpTest()

    def test_groupsViewSet_list_GET(self):
        response = self.auth_client.get("/api/groups/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_groupsViewSet_POST(self):
        data = {
            "id_groupName": "TestGroup1",
            "groupType": "public",
            "groupRange": 30,
            "id_town": self.dummyTown_object_id
        }
        response = self.auth_client.post("/api/groups/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_groupsViewSet_public_GET(self):
        response = self.auth_client.get("/api/groups/public/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.auth_client.get("/api/groups/public/?countryCode=BE", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.auth_client.get("/api/groups/public/?id_town=%s"%self.dummyTown_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_groupsViewSet_private_GET(self):
        response = self.auth_client.get("/api/groups/private/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.auth_client.get("/api/groups/private/?countryCode=BE", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.auth_client.get("/api/groups/private/?id_town=%s"%self.dummyTown_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_groupsViewSet_members_GET(self):
        response = self.auth_client.get("/api/groups/members/?groupName=%s"%self.dummyGroup_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_groupsViewSet_members_POST(self):
        data = {
            "id_person": self.dummyPerson_object_id,
            "id_groupName": self.dummyGroup_object_id,
            "groupAdmin": True
        }
        response = self.auth_client.post("/api/groups/members/?groupName=%s"%self.dummyGroup_object_id, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    #//TODO Delete member

    def test_groupsViewSet_admins_GET(self):
        response = self.auth_client.get("/api/groups/admins/?groupName=%s"%self.dummyGroup_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_groupsViewSet_tools_GET(self):
        response = self.auth_client.get("/api/groups/tools/?groupName=%s"%self.dummyGroup_object_id, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_groupsViewSet_tools_POST(self):
        data = {
            "id_tool": self.dummyTool_object_id,
            "id_groupName": self.dummyGroup_object_id,
        }
        response = self.auth_client.post("/api/groups/tools/?groupName=%s"%self.dummyGroup_object_id, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    #//TODO Delete tool


class TestTownsApi(SetupClass):

    def setUp(self):
        self.setUpTest()
    
    def test_townsViewSet_list_GET(self):
        response = self.auth_client.get("/api/towns/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.auth_client.get("/api/towns/?countryCode=BE", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)[0].get("postCode"), self.dummyTown_dict.get("postCode"))
        self.assertEqual(json.loads(response.content)[0].get("townName"), self.dummyTown_dict.get("townName"))
        self.assertEqual(json.loads(response.content)[0].get("id_countryCode"), self.dummyTown_dict.get("id_countryCode").id_countryCode)


    def test_townsViewSet_POST(self):
        data = {
            "postCode": 1300,
            "townName": "Wavre",
            "id_countryCode": "BE"
        }
        response = self.auth_client.post("/api/towns/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestCountriesApi(SetupClass):

    def setUp(self):
        self.setUpTest()
        
    def test_countriesViewSet_list_GET(self):
        response = self.auth_client.get("/api/countries/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)[0].get("id_countryCode"), self.dummyCountry_dict.get("id_countryCode"))
        self.assertEqual(json.loads(response.content)[0].get("countryName"), self.dummyCountry_dict.get("countryName"))

    def test_countriesViewSet_POST(self):
        data = {
            "id_countryCode": "DE",
            "countryName": "Germany"
        }
        response = self.auth_client.post("/api/countries/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)