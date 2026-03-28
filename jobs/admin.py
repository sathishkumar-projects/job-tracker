from django.contrib import admin
from .models import job

@admin.register(job)
class jobAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'job_role', 'status', 'applied_date','user']
    list_filter = ['status']
    search_fields = ('Company_name', 'job_role')

# Register your models here.
