from flask import jsonify, request
from app.models.Auth.Login import Login

class AuthController:
    def login(self, *args):

        id, pwd = request.args.get("id"), request.args.get("pwd")

        user = Login.validateAccess(id, pwd)

        if user is not None:
            return (jsonify(user.to_json()), 200)

        return (jsonify({"meg":"id or password incorrect."}), 400)