from django.urls import include, path
from rest_framework import routers
from . import views
from . import api

router = routers.DefaultRouter()
router.register(r'person', api.personViewSet, basename='person')
router.register(r'aliases', api.aliasesViewSet, basename='aliases')
router.register(r'personReviews', api.personReviewViewSet, basename='personReviews')
router.register(r'personTools', api.personToolsViewSet, basename='memberTools')
router.register(r'toolImages', api.toolImagesViewSet, basename='toolImages')
router.register(r'toolReviews', api.toolReviewViewSet, basename='toolReviews')




urlpatterns = [
    path('',views.index,name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]