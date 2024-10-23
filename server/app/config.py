from app import app
from app.database import db

from app.models.Users.Teacher import Teacher
from app.models.Users.Student import Student
from app.models.Users.LeecsCoord import CoordLeccs

from app.models.Events.Activity import Activity
from app.models.Events.Requisition import Requisition


with app.app_context():
    db.init_app(app)
    db.create_all()