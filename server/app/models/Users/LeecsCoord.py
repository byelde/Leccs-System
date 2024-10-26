from typing import override
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Integer, Boolean

from app.database import db
from .Teacher import Teacher


class CoordLeccs(Teacher, db.Model):
    
    __tablename__ = "coordleecs"
    __mapper_args__ = {'polymorphic_identity': 'coordleccs'}

    _teacher_id:           Mapped[str] = mapped_column("id",ForeignKey("teachers.id"), primary_key=True)
    _pending_requisitions: Mapped[bool] = mapped_column("pending_req", Boolean, nullable=True)
    

    def __init__(self, teacher: type[Teacher]):
        super().__init__(*list(teacher.to_json().values()))


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