from datetime import datetime as dtt
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, Boolean

from app.database import db


class Activity(db.Model):

    ___tablename__ = "activities"

    _id:             Mapped[int] = mapped_column("id", Integer, primary_key=True, unique=True, autoincrement=True)
    _responsible_id: Mapped[str] = mapped_column("responsible_id", String, nullable=False)
    _category:       Mapped[str] = mapped_column("category", Integer, nullable=False)
    _init_date:      Mapped[str] = mapped_column("init_date", DateTime, nullable=False)
    _end_date:       Mapped[str] = mapped_column("end_date", DateTime, nullable=False)
    _lecc_id:        Mapped[int] = mapped_column("lecc_id", Integer, nullable=False)
    _description:    Mapped[str] = mapped_column("description", DateTime, nullable=True)
    _state:          Mapped[bool] = mapped_column("state", Boolean, nullable=False)
    # ^- state: different between normal users and coordleccs


    def __init__(self,
                 id: str,
                 responsible_id: str,
                 category: str,
                 init_date: dtt,
                 end_date: dtt,
                 lecc_id: int,
                 description: int) -> None:
        
        self._id = id
        self._responsible_id = responsible_id
        self._category = category
        self._init_date = init_date
        self._end_date = end_date
        self._lecc_id = lecc_id
        self._description = description


    def updateData(self, category:str = None, 
                         init_date:str = None,
                         end_date:str = None,
                         lecc_id: str = None,
                         description: str = None) -> None:
        if category:
            self.__updateCategory(category)

        if init_date:
            self.__updateInitDate(init_date)
        
        if end_date:
            self.__updateEndDate(end_date)

        if lecc_id:
            self.__updateLeccId(lecc_id)

        if description:
            self.__updateDescription(description)


    def __updateCategory(self, new_category:str) -> None:
        self._category = new_category

        
    def __updateInitDate(self, new_init_date:str) -> None:
        self._init_date = new_init_date
    
    def __updateEndDate(self, new_end_date:str) -> None:
        self._end_date = new_end_date


    def __updateLeccId(self, new_lecc_id:int) -> None:
        self._lecc_id = new_lecc_id


    def __updateDescription(self, new_description:str) -> None:
        self._description = new_description


    def to_json(self) -> dict:
        return {
            "id": self._id,
            "responsible_id": self._responsible_id,
            "category": self._category,
            "init_date": self._init_date,
            "end_date": self._end_date,
            "lecc_id": self._lecc_id,
            "description": self._description,
            "state": self._state,
        }
