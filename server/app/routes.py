from mvc_flask import Router

# Router.all("activity", only=["create", "show", "delete"])

Router.post("/activity", "activity#create")
Router.get("/activity", "activity#show")
Router.delete("/activity/<query>", "activity#delete")

Router.get("/activity/filtered/<query>", "activity#showAll")
Router.put("/activity/<query>", "activity#update")

Router.get("/login", "auth#login")