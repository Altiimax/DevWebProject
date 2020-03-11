from django.contrib import admin
from django.apps import apps
from .models import *

#admin.site.register(Persons)
#admin.site.register(Groups)

app = apps.get_app_config('toolbox_app')

for model_name, model in app.models.items():
    admin.site.register(model)
