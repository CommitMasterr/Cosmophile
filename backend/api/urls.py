from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.Posts, name="allPosts"),
    path('comments/<str:pk>', views.PostComments, name="postComments"),
    path('comments/', views.PopularByComments, name="popularByComments"),
    path('tags/', views.PostTags, name="allTags"),

    path('comment/create', views.CreateComment, name="createComment"),
]

