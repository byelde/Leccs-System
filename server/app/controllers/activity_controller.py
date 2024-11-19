from flask import jsonify, request
from sqlalchemy import DateTime as dtt
from datetime import datetime

from app.database import db

from app.models.Users.IUser import User
from app.models.Events.Activity import Activity
from app.models.Events.Requisition import Requisition

class ActivityController:
    
    def create(self):
        data = request.json
        
        responsible_id: str = data.get("responsible_id")
        category:       str = data.get("category")
        init_date:      str = data.get("init_date")
        end_date:       str = data.get("end_date")
        lecc_id:        int = data.get("lecc_id")
        description:    str = data.get("description")


        if not (responsible_id and category and lecc_id and init_date and end_date):
            return(jsonify({"message":"data is missing."}), 400)
        
        from app.models.Users.LeecsCoord import CoordLeccs
        from app.models.Users.Teacher import Teacher
        from app.models.Users.Student import Student

        user_obj:type[User]

        user_obj = CoordLeccs.query.filter_by(_teacher_id = responsible_id).first()
        if not (user_obj): user_obj = Teacher.query.filter_by(_id = responsible_id).first()
        if not (user_obj): user_obj = Student.query.filter_by(_id = responsible_id).first()

        print(user_obj)

        try:
            act_obj: type[Activity] = Activity(
                responsible_id = responsible_id,
                category = category,
                init_date = datetime.fromisoformat(init_date),
                end_date = datetime.fromisoformat(end_date),
                lecc_id = lecc_id,
                description = description
            )
            user_obj.bookLecc(act_obj)

        except Exception as e:
            return (jsonify({"message":str(e)}), 400)
            

        return (jsonify({"message":"request send successfully."}), 200)
    
    
    def show(self, id):

        act_id = request.json.get("id")

        if not act_id:
            return(jsonify({"message":"data is missing."}), 400)

        try:
            act_obj: type[Activity] = Activity.query.filter_by(_id=act_id).first()

        except Exception as e:
            return(jsonify({"message":str(e)}), 400)
        
        return jsonify(act_obj.to_json(), 200)
    

    def showAll(self, query):

        args = request.args

        id:         int = int(args.get("id")) if args.get("id") else 0
        resp_id:    int = args.get("responsible_id") if args.get("responsible_id") else ""
        category:   str = args.get("category") if args.get("category") else ""
        lecc_id:    int = int(args.get("lecc_id")) if args.get("lecc_id") else 0
        max_date:   datetime = datetime.fromisoformat(args.get("max_date")) if args.get("max_date") else datetime.max
        min_date:   datetime = datetime.fromisoformat(args.get("min_date")) if args.get("min_date") else datetime.min
        state:      bool = args.get("state") if (args.get("state") != None) else None


        act_obj_list: list[Activity] = db.session.query(Activity).filter(
            ((Activity._id == id) if (id) else (Activity._id != id)),
            ((Activity._responsible_id == resp_id) if (resp_id) else (Activity._responsible_id != resp_id)),
            ((Activity._category == category) if (category) else (Activity._category != category)),
            ((Activity._lecc_id == lecc_id) if (lecc_id) else (Activity._lecc_id != lecc_id)),
            Activity._init_date.between(min_date, max_date),
            ((Activity._state == state) if (state != None) else (True))
        ).all()


        return (jsonify([
            obj.to_json() for obj in act_obj_list
            ], 200)
        )
    
    
    def update(self, query):

        args = request.args

        id         : str = args.get("id")
        category   : str = args.get("category")
        init_date  : str = args.get("init_date")
        end_date   : str = args.get("end_date")
        lecc_id    : str = args.get("lecc_id")
        description: str = args.get("description")

        coord_id: str = args.get("coord_id")

        if (coord_id):
            from app.models.Users.LeecsCoord import CoordLeccs

            coord_obj:type[CoordLeccs] = CoordLeccs.query.filter_by(_teacher_id = coord_id).first()

            if not(coord_obj):
                return(jsonify({"message": "permission denied."}), 400)
            
            try:
                coord_obj.acceptRequisition(id)
                coord_id.updateReqState()

                return(jsonify({"message": "requisition accepted."}), 200)
            
            except Exception as e:

                return (jsonify({"message":str(e)}), 400)


        if not (id and (category or init_date or end_date or lecc_id or description)):
            return (jsonify({"message":"data is missing."}), 400)
        
        act_obj: type[Activity] = Activity.query.filter_by(_id = id).first()

        if act_obj is None:
            return (jsonify({"message":"activity not found."}), 400)

        act_obj.updateData(
            category,
            init_date,
            end_date,
            lecc_id,
            description,
        )

        try:
            db.session.commit()

        except Exception as e:
            return (jsonify({"message":str(e)}), 400)
        

        return(jsonify({"message": "activity updated."}), 200)

             
    def delete(self, query):

        data = request.args
        id = data.get("id")
        resp_id = data.get("resp_id")

        from app.models.Users.LeecsCoord import CoordLeccs
        from app.models.Users.Teacher import Teacher
        from app.models.Users.Student import Student

        user_obj:type[User]

        user_obj = CoordLeccs.query.filter_by(_teacher_id = resp_id).first()
        if not (user_obj): user_obj = Teacher.query.filter_by(_id = resp_id).first()
        if not (user_obj): user_obj = Student.query.filter_by(_id = resp_id).first()

        try:
            id = int(id)
        except:
            return (jsonify({"message":"invalid activity id."}), 400)
        
        try:
            act_obj:type[Activity] = Activity.query.filter_by(_id = id).first()
            user_obj.cancelBook(act_obj)
            return (jsonify({"message":"activity deleted."}), 200)

        except Exception as e:
            return (jsonify({"message":str(e)}), 400)

