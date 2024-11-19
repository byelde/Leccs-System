from flask import Flask
from mvc_flask import FlaskMVC
from flask_cors import CORS

from app.database import db

from app.models.Users.Teacher import Teacher
from app.models.Users.Student import Student
from app.models.Users.LeecsCoord import CoordLeccs

from app.models.Events.Activity import Activity
from app.models.Events.Requisition import Requisition



def create_app(SQLITE_URI: str, SECRET_KEY: str) -> Flask:

    app: type[Flask] = Flask(__name__)
    FlaskMVC(app)

    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLITE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)

    app.config['CORS_HEADERS'] = 'Content-Type'

    return app

app = create_app(
        SQLITE_URI= "sqlite:///mydatabase.db",
        SECRET_KEY="SECRET_KEY"
    )


with app.app_context():
    db.init_app(app)
    db.create_all()