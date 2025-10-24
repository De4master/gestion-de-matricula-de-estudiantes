from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, CourseViewSet, SectionViewSet, EnrollmentViewSet

r = DefaultRouter()
r.register("students", StudentViewSet)
r.register("courses", CourseViewSet)
r.register("sections", SectionViewSet)
r.register("enrollments", EnrollmentViewSet)
urlpatterns = r.urls
