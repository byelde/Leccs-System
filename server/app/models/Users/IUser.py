from abc import abstractmethod

class User():


    @abstractmethod
    def bookLecc(self) -> None:
        pass


    @abstractmethod
    def cancelBook(self) -> None:
        pass


    @abstractmethod
    def getName(self) -> None:
        pass
    
    
    @abstractmethod
    def getEmail(self) -> None:
        pass

    @abstractmethod
    def to_json(self) -> None:
        pass
    
    @abstractmethod
    def validatePwd(self, pwd:str) -> bool:
        pass