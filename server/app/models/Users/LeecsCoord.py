from typing import override
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Boolean

from app.database import db
from .Teacher import Teacher
from app.models.Events.Activity import Activity

class CoordLeccs(Teacher, db.Model):
    
    __tablename__ = "coordleecs"
    __mapper_args__ = {'polymorphic_identity': 'coordleccs'}

    _teacher_id:           Mapped[str] = mapped_column("id",ForeignKey("teachers.id"), primary_key=True)
    _pending_requisitions: Mapped[bool] = mapped_column("pending_req", Boolean, nullable=True)
    

    def __init__(self, teacher: type[Teacher]):
        self.updateReqState()
        print("INIT COOR\n\n\n")
        super().__init__(*list(teacher.to_json().values()))


    @override
    def bookLecc(self, act_obj: type[Activity]) -> None:
        from app.models.Events.Requisition import Requisition

        act_obj.sendActivity()
        req_obj: type[Requisition] = Requisition(act_obj.getId())
        req_obj.sendRequisition()
        self.acceptRequisition(act_obj.getId())


    @override
    def cancelBook(self, act_obj: type[Activity]) -> None:
        from app.models.Events.Requisition import Requisition
        if not (act_obj.getState()):
            req_obj: type[Requisition] = Requisition.query.filter_by(_activity_id = act_obj.getId()).first()
            db.session.delete(req_obj)
        db.session.delete(act_obj)
        db.session.commit()

        
    def acceptRequisition(self, activity_id: int):

        from app.models.Events.Activity import Activity
        from app.models.Events.Requisition import Requisition

        act_obj:type[Activity] = Activity.query.filter_by(_id=activity_id).first()
        req_obj:type[Requisition] = Requisition.query.filter_by(_activity_id = activity_id).first()

        act_obj.updateState(True)
        db.session.delete(req_obj)
        db.session.commit()


    def updateReqState(self):
        from app.models.Events.Requisition import Requisition
        req_list: type[Requisition] = Requisition.query.all()

        if not (req_list):
            self._pending_requisitions = False
            self.commit()


    def newRequisition(self):
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
            "pending_req":  self._pending_requisitions,
            "class":        "coord"
        }