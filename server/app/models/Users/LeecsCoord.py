from .Teacher import Teacher
from typing import override

class CoordLeccs(Teacher):
    
    _pending_requisitions: bool


    def __init__(self, id, name, email, password):
        super().__init__(id, name, email, password)


    @override
    def reserveLecc(self, activity_id: int) -> None:
        pass


    @override
    def cancelReserva(self, activity_id: int) -> None:
        pass