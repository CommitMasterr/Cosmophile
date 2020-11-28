from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from ckeditor.fields import RichTextField

# Create your models here.

class PostTag(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Post(models.Model):
    thumbnail = models.CharField(max_length=500)
    title = models.CharField(max_length=150)
    slugTitle = models.SlugField(max_length=150, default='slug-Title')
    content = RichTextField(blank=True, null=True)
    # content = models.TextField()
    tags = models.ManyToManyField(PostTag)
    date = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        value = self.title
        self.slugTitle = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now, blank=True)


    def __str__(self):
        return self.name
