from flask import Flask
from mvc_flask import FlaskMVC
from flask_cors import CORS

def create_app(SQLITE_URI: str, SECRET_KEY: str) -> Flask:

    app: type[Flask] = Flask(__name__)
    FlaskMVC(app)

    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLITE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)

    return app

app = create_app(
        SQLITE_URI= "sqlite:///mydatabase.db",
        SECRET_KEY="SECRET_KEY"
    )