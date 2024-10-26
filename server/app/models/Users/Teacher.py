from typing import override
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String as String

from app.database import db
from .IUser import User

class Teacher(db.Model, User):
    
    __tablename__ = "teachers"
    __mapper_args__ = {"polymorphic_identity": "teachers", "polymorphic_on": "_type"}

    _id:        Mapped[str] = mapped_column("id", String, primary_key=True)
    _name:      Mapped[str] = mapped_column("name", String)
    _email:     Mapped[str] = mapped_column("email", String, unique=True)
    _password:  Mapped[str] = mapped_column("password", String)
    _type:      Mapped[str] = mapped_column("type", String)
    

    def __init__(self, id: str, name: str, email: str, password: str) -> None:
        self._id        = id 
        self._name      = name 
        self._email     = email 
        self._password  = password


    @override
    def bookLecc(self, activity_id: int) -> int:
        pass


    @override
    def cancelBook(self, activity: int) -> None:
        pass


    # @override
    # def getId(self) -> str:
    #     return self._id
    

    @override
    def getName(self) -> str:
        return self._nome
    

    @override
    def getEmail(self) -> str:
        return self._email
    
    
    @override
    def to_json(self) -> dict:
        return {
            "id":       self._id,
            "name":     self._name,
            "email":    self._email,
            "password": self._password
        }