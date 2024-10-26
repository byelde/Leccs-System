from typing import override
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Integer

from app.database import db
from .Teacher import Teacher


class CoordLeccs(Teacher, db.Model):
    
    __tablename__ = "coordleecs"

    _id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    _teacher_id: Mapped[str] = mapped_column(ForeignKey("teachers.id"))
    
    _teacher_assoc: Mapped["Teacher"] = relationship(back_populates="_coord_assoc")


    def __init__(self, id, name, email, password):
        super().__init__(id, name, email, password)
        self._teacher_id = id


    @override
    def bookLecc(self, activity_id: int) -> int:
        pass

        
    def acceptRequisition(self, activity_id: int):
        pass


    def newRequisition(self, state):
        if not self._pending_requisitions:
            self._pending_requisitions = True
        db.session.commit()


    def getId(self) -> str:
        return self._teacher_id

    
    @override
    def to_json(self) -> dict:
        return {
            "id":           self._id,
            "teacher_id":   self._teacher_id,
            "name":         self._name,
            "email":        self._email,
            "password":     self._password,
            "pending_req":  self._pending_requisitions
        }