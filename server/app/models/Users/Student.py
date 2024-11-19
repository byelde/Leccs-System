from typing import override
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String as String

from app.database import db
from .IUser import User
from app.models.Events.Activity import Activity
from app.models.Events.Requisition import Requisition

class Student(User, db.Model):
    
    __tablename__ = "students"

    _id:        Mapped[str] = mapped_column("id", String, primary_key=True)
    _name:      Mapped[str] = mapped_column("name", String)
    _email:     Mapped[str] = mapped_column("email", String, unique=True)
    _password:  Mapped[str] = mapped_column("password", String)


    def __init__(self, id: str, name: str, email: str, password: str) -> None:
        self._id        = id 
        self._name      = name 
        self._email     = email 
        self._password  = password


    @override
    def bookLecc(self, act_obj: type[Activity]) -> int:
        act_obj.sendActivity()
        req_obj: type[Requisition] = Requisition(act_obj.getId())
        req_obj.sendRequisition()


    @override
    def cancelBook(self, activity: type[Activity]) -> None:
        if not (activity.getState()):
            req_obj: type[Requisition] = Requisition.query.filter_by(_activity_id = activity.getId()).first()
            db.session.delete(req_obj)
        db.session.delete(activity)
        db.session.commit()



    @override
    def validatePwd(self, pwd:str) -> bool:
        return pwd == self._password
    

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