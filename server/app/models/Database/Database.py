from flask_sqlalchemy import SQLAlchemy

class Database():
    
    _instance: SQLAlchemy|None = None

    def __new__(cls, *args, **kwds):

        if cls._instance == None:
            cls._instance = SQLAlchemy()
            
        return cls._instance
    