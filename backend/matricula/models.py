from django.db import models

# ----------------------------
# Estudiante
# ----------------------------
class Student(models.Model):
    doc_id = models.CharField("DNI / Partida", max_length=20, unique=True)
    first_name = models.CharField("Nombres", max_length=100)
    last_name = models.CharField("Apellidos", max_length=100)
    email = models.EmailField("Correo", blank=True, null=True, unique=False)
    birth_date = models.DateField("Fecha de nacimiento", null=True, blank=True)
    address = models.CharField("Dirección", max_length=255, blank=True, null=True)
    phone = models.CharField("Teléfono / Celular", max_length=20, blank=True, null=True)
    previous_school = models.CharField("Colegio anterior", max_length=150, blank=True, null=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name} ({self.doc_id})"

    class Meta:
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"


# ----------------------------
# Apoderado (padre/madre/tutor)
# ----------------------------
class Guardian(models.Model):
    REL_CHOICES = [
        ("Padre", "Padre"),
        ("Madre", "Madre"),
        ("Apoderado", "Apoderado"),
        ("Otro", "Otro"),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="guardians", verbose_name="Estudiante")
    full_name = models.CharField("Apellidos y nombres", max_length=150)
    relationship = models.CharField("Parentesco", max_length=20, choices=REL_CHOICES)
    dni = models.CharField("DNI", max_length=20, blank=True)
    phone = models.CharField("Teléfono / Celular", max_length=20, blank=True)
    address = models.CharField("Dirección", max_length=255, blank=True)

    def __str__(self):
        return f"{self.full_name} ({self.relationship})"

    class Meta:
        verbose_name = "Apoderado"
        verbose_name_plural = "Apoderados"


# ----------------------------
# Curso
# ----------------------------
class Course(models.Model):
    code = models.CharField("Código", max_length=20, unique=True)
    name = models.CharField("Nombre", max_length=150)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"


# ----------------------------
# Sección (grado/curso + letra)
# ----------------------------
class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name="Curso")
    code = models.CharField("Sección", max_length=10)  # Ej: A, B, 1A, etc.
    capacity = models.PositiveIntegerField("Capacidad", default=30)
    enrolled = models.PositiveIntegerField("Matriculados", default=0)

    def __str__(self):
        return f"{self.course.code}-{self.code}"

    class Meta:
        verbose_name = "Sección"
        verbose_name_plural = "Secciones"


# ----------------------------
# Matrícula (datos generales)
# ----------------------------
class Enrollment(models.Model):
    LEVEL_CHOICES = [("Inicial", "Inicial"), ("Primaria", "Primaria"), ("Secundaria", "Secundaria")]
    SHIFT_CHOICES = [("Mañana", "Mañana"), ("Tarde", "Tarde")]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Estudiante")
    section = models.ForeignKey(Section, on_delete=models.CASCADE, verbose_name="Sección")
    school_year = models.PositiveIntegerField("Año escolar")
    level = models.CharField("Nivel", max_length=10, choices=LEVEL_CHOICES)
    shift = models.CharField("Turno", max_length=10, choices=SHIFT_CHOICES)
    observations = models.TextField("Observaciones", blank=True)

    class Meta:
        unique_together = ("student", "section", "school_year")
        verbose_name = "Matrícula"
        verbose_name_plural = "Matrículas"

    def __str__(self):
        return f"{self.student.doc_id} → {self.section} ({self.school_year})"
