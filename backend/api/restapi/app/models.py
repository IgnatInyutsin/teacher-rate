from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Teacher(models.Model):
    name = models.CharField("Имя", max_length=200)
    description = models.TextField("Описание")
    study_place = models.CharField("Место учёбы", max_length=200)
    job_place = models.CharField("Место работы", max_length=200)
    city = models.CharField("Город", max_length=200)
    photo = models.URLField("Фото")
    grade_mean = models.FloatField(
        "Средняя оценка",
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        default=5
    )
    grade_count = models.PositiveBigIntegerField("Количество оценок", default=0)

    def __str__(self):
        return f"<Teacher {self.name} in {self.job_place}>"

    class Meta:
        verbose_name = "Учитель"
        verbose_name_plural = "Учителя"


class Review(models.Model):
    author = models.ForeignKey(
        User,
        models.CASCADE,
        related_name="reviews_owner",
        verbose_name="Рецензент"
    )
    title = models.CharField("Заголовок", max_length=200)
    main_text = models.TextField("Основной текст")
    grade = models.PositiveSmallIntegerField("Оценка", validators=[MaxValueValidator(5)])
    teacher = models.ForeignKey(
        Teacher,
        models.CASCADE,
        related_name="reviews",
        verbose_name="Учитель"
    )

    def __str__(self):
        return f"<Review for {self.teacher} from {self.author}>"
    
    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
