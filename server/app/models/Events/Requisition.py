from datetime import datetime as dtt
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, Boolean

from app.database import db


class Requisition(db.Model):

    __tablename__ = "requisitions"

    _id:            Mapped[int] = mapped_column("id", Integer, nullable=False, autoincrement=True, primary_key=True)
    _activity_id:   Mapped[int] = mapped_column("activity_id", Integer, nullable=False)
    _subscriber_id: Mapped[str] = mapped_column("subscriber_id", String, nullable=False)


    def __init__(self, id_activity, id_subscriber):
        self._activity_id = id_activity
        self._subscriber_id= id_subscriber


    @classmethod
    def sendRequisition(self, activity_id: int) -> None:
        pass


    @classmethod
    def notifySubscriber(self) -> None:
        pass


    @classmethod
    def updateSubscriber(cls, new_subscriber_id: str) -> None:
        cls._subscriber_id = new_subscriber_id


    def to_json(self) -> dict:
        return{
            "id": self.id,
            "activity_id": self._activity_id,
            "subscriber_id": self._subscriber_id
        }