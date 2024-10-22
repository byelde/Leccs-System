from .IRoom import IRoom
from typing import override

class Lecc(IRoom):

    _id: int
    _activities_ids: list[int]


    def __init__(self, id:int) -> None:
        self._id = id

    
    @override
    def getId(self) -> int:
        return self._id
    

    @override
    def getActivities(self) -> list[int]:
        return self._activities_ids

    
    @override
    def addActivity(self, *activity_id) -> None:
        for atv_id in activity_id:
            self._activities_ids.append(atv_id)


    @override
    def suspendOperation(self) -> None:
        pass
    

    @override
    def returnOperation(self) -> None:
        pass