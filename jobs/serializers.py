from rest_framework import serializers
from .models import job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = job
        fields = ['id', 'company_name', 'job_role', 'status', 'applied_date', 'notes']
        read_only_fields = ['applied_date']