from rest_framework import serializers

# Custom
from .models import *

# Searializers here

class PostTagSerializer(serializers.ModelSerializer):    
    class Meta:
        model = PostTag
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(
    format="%d.%m.%Y", required=False, read_only=True)
    tags = PostTagSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'

class PostCommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(
    format="%d.%m.%Y", required=False, read_only=True)
    
    class Meta:
        model = PostComment
        fields = '__all__'


class PopularPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ['post']
