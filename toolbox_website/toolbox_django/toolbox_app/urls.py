from django.urls import include, path
from rest_framework import routers
from . import views
from . import api

router = routers.DefaultRouter()
router.register(r'persons', api.personsViewSet, basename='persons')
router.register(r'tools', api.toolsViewSet, basename='tools')
router.register(r'groups', api.groupsViewSet, basename='groups')
#router.register(r'towns', api.townsViewSet, basename='towns')


urlpatterns = [
    path('',views.index,name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]