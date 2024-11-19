from datetime import datetime as dtt
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer

from app.database import db


class Requisition(db.Model):

    __tablename__ = "requisitions"

    _id:            Mapped[int] = mapped_column("id", Integer, nullable=False, autoincrement=True, primary_key=True)
    _activity_id:   Mapped[int] = mapped_column("activity_id", Integer, nullable=False)
    _subscriber_id: Mapped[str] = mapped_column("subscriber_id", Integer, nullable=False)


    def __init__(self, id_activity: int, id_subscriber: int|None = None):
        self._activity_id   = id_activity
        self._subscriber_id = id_subscriber


    def sendRequisition(self) -> None:

        self.notifySubscriber()

        db.session.add(self)
        db.session.commit()
        db.session.flush()


    def notifySubscriber(self) -> None:
        from app.models.Users.LeecsCoord import CoordLeccs

        coord_lecc_obj: type[CoordLeccs]

        if not self._subscriber_id:
            coord_lecc_obj = CoordLeccs.query.first()
            self.__updateSubscriber(coord_lecc_obj.getId())
            self._subscriber_id = coord_lecc_obj.getId()

        else:
            coord_lecc_obj = CoordLeccs.query.filter_by(_id = self._subscriber_id).first()

        coord_lecc_obj.newRequisition(True)


    @classmethod
    def __updateSubscriber(cls, new_subscriber_id: str) -> None:
        cls._subscriber_id = new_subscriber_id


    def to_json(self) -> dict:
        return{
            "id": self.id,
            "activity_id": self._activity_id,
            "subscriber_id": self._subscriber_id
        }