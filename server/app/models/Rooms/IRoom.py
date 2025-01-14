from abc import ABC, abstractmethod

class IRoom(ABC):

    @abstractmethod
    def getId(self) -> None:
        pass
    
    @abstractmethod
    def getActivities(self) -> None:
        pass
    
    @abstractmethod
    def addActivity(self) -> None:
        pass
