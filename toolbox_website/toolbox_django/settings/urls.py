
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include,path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('',include('toolbox_app.urls')),
    path('admin/', admin.site.urls),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),  # ! UN-COMMENT THIS LINE IN PRODUCTION
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
