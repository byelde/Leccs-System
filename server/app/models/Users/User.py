class User():
    
    __tablename__ = "users"

    _id: str
    _name: str
    _email: str
    _password: str

    def __init__(self, id: str, name: str, email: str, password: str) -> None:
        self._id = id 
        self._name = name 
        self._email = email 
        self._password = password


    def bookLecc(self, activity_id: int) -> int:
        pass


    def cancelBook(self, activity: int) -> None:
        pass


    def getId(self) -> str:
        return self._id
    

    def getNome(self) -> str:
        return self._nome
    

    def getEmail(self) -> str:
        return self._email
    

    def to_json(self) -> dict:
        return {
            "id": self._id,
            "name": self._name,
            "email":self._email,
            "password":self._password
        }