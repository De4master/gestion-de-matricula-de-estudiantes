from django.contrib import admin
from .models import Student, Guardian, Course, Section, Enrollment

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("doc_id", "last_name", "first_name", "email", "birth_date")
    search_fields = ("doc_id", "first_name", "last_name", "email")

@admin.register(Guardian)
class GuardianAdmin(admin.ModelAdmin):
    list_display = ("full_name", "relationship", "dni", "phone", "student")
    list_filter = ("relationship",)
    search_fields = ("full_name", "dni", "student__doc_id")

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("code", "name")
    search_fields = ("code", "name")

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "course", "code", "capacity", "enrolled")
    list_filter = ("course",)
    search_fields = ("code",)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "section", "school_year", "level", "shift")
    list_filter = ("school_year", "level", "shift", "section__course")
    search_fields = ("student__doc_id", "student__last_name", "student__first_name")
