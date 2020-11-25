from django.contrib import admin

# Custom
from .models import *


# Register your models here.

admin.site.register(Post)
admin.site.register(PostTag)
admin.site.register(PostComment)