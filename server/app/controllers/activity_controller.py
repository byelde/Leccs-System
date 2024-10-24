from flask import jsonify, request
import json
from sqlalchemy import DateTime as dtt
from datetime import datetime

# from app.app import app
from app.database import db

from app.models.Events.Activity import Activity
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
            return(
                jsonify({
                    "message":"data is missing."
                }),
                400
            )
        

        act_obj = Activity(
            responsible_id = responsible_id,
            category = category,
            init_date = datetime.fromisoformat(init_date),
            end_date = datetime.fromisoformat(end_date),
            lecc_id = lecc_id,
            description = description
        )

        try:
            db.session.add(act_obj)
            db.session.commit()

        except Exception as e:
            return (
                jsonify({
                    "message":str(e)
                }),
                400
            )


        return (
            jsonify({
                "message":"activity created successfully."
            }),
            200
        )
    
    
    def show(self, id):

        act_id = request.json.get("id")

        if not act_id:
            return(
                jsonify({
                    "message":"data is missing."
                }),
                400
            )

        try:
            act_obj: type[Activity] = Activity.query.filter_by(_id=act_id).first()

        except Exception as e:
            return(
                jsonify({
                    "message":str(e)
                }),
                400
            )
        

        return jsonify(
            act_obj.to_json(),
            200
        )
    


    def showAll(self, query):

        args = request.args


        id:             int|None = int(args.get("id")) if args.get("id") else None
        category:       str|None = args.get("category")
        lecc_id:        int|None = int(args.get("lecc_id")) if args.get("lecc_id") else None


        filter_data = {"_id": id, "_category": category, "_lecc_id": lecc_id}
        filter_data = {key: value for (key, value) in filter_data.items() if value}

        act_obj_list: list[Activity]= Activity.query.filter_by(**filter_data).all()


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


        if not (id and (category or init_date or end_date or lecc_id or description)):
            return (
                jsonify({
                    "message":"data is missing."
                }),
                400
            )
        
        act_obj: type[Activity] = Activity.query.filter_by(_id = id).first()

        if act_obj is None:
            return (
                jsonify({
                    "message":"activity not found."
                }),
                400
            )

        act_obj.updateData(
            category,
            init_date,
            end_date,
            lecc_id,
            description
        )

        try:
            db.session.commit()

        except Exception as e:
            return (
                jsonify({
                    "message":str(e)
                }),
                400
            )
        

        return(
            jsonify({
                "message": "activity updated."
            }),
            200
        )

             
    
    def delete(self, id):

        try:
            id = int(id)
        except:
            return (
                jsonify({
                    "message":"invalid activity id."
                }),
                400
            )
        

        try:
            Activity.query.filter_by(_id = id).delete()
            db.session.commit()

        except Exception as e:
            return (
                jsonify({
                    "message":str(e)
                }),
                400
            )


        return (
            jsonify(
                {"message":"activity deleted."}
            ),
            200
        )