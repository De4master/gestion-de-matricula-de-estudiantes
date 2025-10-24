from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import transaction
from .models import Student, Course, Section, Enrollment
from .serializers import *

class ROorAuth(permissions.BasePermission):
    def has_permission(self, req, view):
        return req.method in ("GET","HEAD","OPTIONS") or (req.user and req.user.is_authenticated)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [ROorAuth]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [ROorAuth]

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.select_related("course").all()
    serializer_class = SectionSerializer
    permission_classes = [ROorAuth]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.select_related("student","section").all()
    serializer_class = EnrollmentSerializer
    permission_classes = [ROorAuth]

    @action(detail=False, methods=["post"])
    @transaction.atomic
    def do_enroll(self, request):
        sid, secid = request.data.get("student_id"), request.data.get("section_id")
        sec = Section.objects.select_for_update().get(id=secid)
        if sec.enrolled >= sec.capacity: raise ValidationError("Sin cupos.")
        enr, created = Enrollment.objects.get_or_create(student_id=sid, section_id=secid)
        if created:
            sec.enrolled += 1; sec.save(update_fields=["enrolled"])
        return Response(self.get_serializer(enr).data)
