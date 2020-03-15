from django.urls import include, path
from rest_framework import routers
from . import views
from . import api

router = routers.DefaultRouter()
router.register(r'persons', api.personsViewSet)
router.register(r'aliases', api.aliasesViewSet)
router.register(r'memberProfile', api.memberProfileViewSet,basename='memberProfile')
router.register(r'memberTools', api.memberToolsViewSet,basename='memberTools')
router.register(r'toolImages', api.toolImagesViewSet,basename='toolImages')


urlpatterns = [
    path('',views.index,name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]