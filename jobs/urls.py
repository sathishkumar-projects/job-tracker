from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, register, login, ai_suggest

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('ai-suggest/', ai_suggest, name='ai_suggest'),
]   