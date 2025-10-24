from rest_framework import serializers
from .models import Student, Course, Section, Enrollment

class StudentSerializer(serializers.ModelSerializer):
    class Meta: model = Student; fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
    class Meta: model = Course; fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
    class Meta: model = Section; fields = "__all__"

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta: model = Enrollment; fields = "__all__"
