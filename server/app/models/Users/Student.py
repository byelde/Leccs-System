from .User import User

class Teacher(User):
    
    __tablename__ = "students"

    def __init__(self, id, name, email, password):
        super().__init__(id, name, email, password)