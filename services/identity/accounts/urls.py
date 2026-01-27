from django.urls import path
from .views import RegisterView, ProfileView
from typing import List
from django.urls.resolvers import URLPattern

urlpatterns: List[URLPattern] = [
    path("register/", RegisterView.as_view(), name="auth_register"),
    path("profile/", ProfileView.as_view(), name="user_profile"),
]