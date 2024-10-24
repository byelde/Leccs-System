from mvc_flask import Router

Router.all("activity", only=["create", "show", "delete"])

Router.get("/activity/filtered/<query>", "activity#showAll")
Router.put("/activity/<query>", "activity#update")
