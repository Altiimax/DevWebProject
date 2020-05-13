from django.urls import include, path
from rest_framework import routers
from . import views
from . import api

router = routers.DefaultRouter()
router.register(r'persons', api.personsViewSet, basename='persons')
router.register(r'tools', api.toolsViewSet, basename='tools')
router.register(r'groups', api.groupsViewSet, basename='groups')
router.register(r'towns', api.townsViewSet, basename='towns')
router.register(r'countries', api.countriesViewSet, basename='countries')
router.register(r'search', api.searchViewSet, basename='search')


urlpatterns = [
    path(r'',views.index,name='index'),
    path(r'api/', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]