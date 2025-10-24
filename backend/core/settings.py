import os
from pathlib import Path
from dotenv import load_dotenv; load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY","dev")
DEBUG = os.getenv("DJANGO_DEBUG","True") == "True"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS","*").split(",")

INSTALLED_APPS = [
    "django.contrib.admin","django.contrib.auth","django.contrib.contenttypes",
    "django.contrib.sessions","django.contrib.messages","django.contrib.staticfiles",
    "rest_framework","corsheaders","matricula",
]
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware","django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware","django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware","django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware","django.middleware.clickjacking.XFrameOptionsMiddleware",
]
ROOT_URLCONF = "core.urls"
WSGI_APPLICATION = "core.wsgi.application"

DATABASES = { "default": { "ENGINE":"django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3" } }

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES":["rest_framework_simplejwt.authentication.JWTAuthentication"],
    "DEFAULT_PERMISSION_CLASSES":["rest_framework.permissions.IsAuthenticatedOrReadOnly"],
}
CORS_ALLOWED_ORIGINS = [u for u in os.getenv("CORS_ALLOWED_ORIGINS","").split(",") if u]

LANGUAGE_CODE="es"
TIME_ZONE="America/Lima"
USE_I18N=True
USE_TZ=True
STATIC_URL="static/"
DEFAULT_AUTO_FIELD="django.db.models.BigAutoField"
