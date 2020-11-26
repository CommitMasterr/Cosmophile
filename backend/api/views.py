from django.shortcuts import render
from django.conf import settings
from collections import Counter
import requests
import json

from django.http import HttpResponse

# RestFramewok
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

# Custom
from .models import *
from .serializers import *


# Create your views here.

@api_view(['GET'])
def Posts(request):
    try:
        posts = Post.objects.all()
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializers = PostSerializer(posts, many=True)
        return Response(serializers.data)


@api_view(['GET'])
def PostComments(request, pk):
    try:
        postComments = PostComment.objects.filter(post=pk)
    except PostComment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializers = PostCommentSerializer(postComments, many=True)
        return Response(serializers.data)


@api_view(['GET'])
def PopularByComments(request):
    try:
        comments = PostComment.objects.all()

        postComments = []

        for c in comments:
            postComments.append(c.post.id)

        data = Counter(postComments)
        popularPost = data.most_common(5)

        clean = []
        for c in popularPost:
            clean.append(c[0])
        
        posts = []
        for c in clean:
            posts.append(Post.objects.get(id=c))
            
    except PostComment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializers = PostSerializer(posts, many=True)
        return Response(serializers.data)


@api_view(['GET'])
def PostTags(request):
    try:
        postTags = PostTag.objects.all()
    except PostTag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializers = PostTagSerializer(postTags, many=True)
        return Response(serializers.data)





@api_view(['POST'])
def CreateComment(request):
    postComment = PostComment()
    if request.method == "POST":
        response = {}

        data = request.data

        captchaToken = data.get('recaptchaToken')

        url = "https://www.google.com/recaptcha/api/siteverify"
        params = {
            'secret': settings.RECAPTCHA_SECRET_KEY,
            'response': captchaToken,
        }

        verify_rs = requests.get(url, params=params, verify=True)
        verify_rs = verify_rs.json()
        
        response["status"] = verify_rs.get("success", False)
        response['message'] = verify_rs.get('error-codes', None) or "Unspecified error."

        if response["status"] == True:
            data.pop('recaptchaToken')
            serializer = PostCommentSerializer(postComment, data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_403_FORBIDDEN)

