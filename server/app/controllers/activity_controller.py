from app import app
from app.database import db
from flask import jsonify

class ActivityController:
    def create(self):
        return jsonify(
            {"message":"create"}
        )
    
    def show(self, id):
        return jsonify(
            {"message":"show"}
        )
    
    def showAll(self, id):
        return jsonify(
            {"message":"showAll"}
        )
    
    def update(self, id):
        return jsonify(
            {"message":"update"}
        )
    
    def delete(self, id):
        return jsonify(
            {"message":"delete"}
        )