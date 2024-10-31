from app.models.Users.IUser import User
from app.models.Users.LeecsCoord import CoordLeccs
from app.models.Users.Teacher import Teacher
from app.models.Users.Student import Student

class Login():

    @classmethod
    def validateAccess(self, id: str, pwd:str) -> User|None: 
        user: type[User]

        user = Teacher.query.filter_by(_id=id).first()

        if user is None:
            user = Student.query.filter_by(_id=id).first()


        if user is None:
            return None
        

        if user.validatePwd(pwd=pwd):
            return user
        
        return None

