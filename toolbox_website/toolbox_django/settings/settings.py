import datetime
import os

from django.conf.global_settings import STATICFILES_DIRS, STATICFILES_STORAGE


########################################################
# ! CHECK BOTTOM OF FILE FOR PRODUCTION SETTINGS 
# ! CHECK FOR COMMENTS IN FILE FOR OTHER PRODUCTION SETTINGS
########################################################

DEBUG = True # ! MUST BE SET TO FALSE IN PRODUCTION


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = '5dja8*ii$qrd+mk^9jksua^7=kl+l3*ricfek0170832$owc_#'

ALLOWED_HOSTS = ['toolbox-app.herokuapp.com','127.0.0.1']


INSTALLED_APPS = [
    'toolbox_app.apps.Toolbox_appConfig',
    'rest_framework',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        #'DIRS': [os.path.join(BASE_DIR, 'build')],  # ! UN-COMMENT THIS LINE IN PRODUCTION
        'DIRS': [],                                # ! COMMENT THIS LINE IN PRODUCTION
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'settings.wsgi.application'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'toolbox_db',
        'USER': 'admin',
        'PASSWORD': 'devweb2',
        'HOST': '109.128.245.26',
        'PORT': '5432',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'CET'
USE_I18N = True
USE_L10N = True
USE_TZ = True


CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

JWT_AUTH = {
    'JWT_PAYLOAD_HANDLER': 'toolbox_app.utils.jwt_payload_handler',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3600),
    'JWT_ALLOW_REFRESH': True,
}

STATIC_URL = '/static/'

########################################################
#! PRODUCTION SETTINGS 
#! ALL THESE SETTINGS SHOULD BE UN-COMMENTED IN PRODUCTION!

#SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
#SECURE_SSL_REDIRECT = True


#STATICFILES_DIRS = [
#    os.path.join(BASE_DIR, 'build/static'),
#]
#STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
#STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'