from rest_framework import serializers
from .models import Student, Guardian, Course, Section, Enrollment

# Guardian inline para crear junto con el estudiante si quieres
class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = "__all__"
        read_only_fields = ("id",)

class StudentSerializer(serializers.ModelSerializer):
    guardians = GuardianSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"
