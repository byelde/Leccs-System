from mvc_flask import Router

Router.all("activity", only=["create", "show", "update", "delete"])
Router.get("/activity/all/<id>", "activity#showAll")