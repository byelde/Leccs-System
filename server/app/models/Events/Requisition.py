class Requisition():

    __tablename__ = "requisitions"

    _id: int
    _activity_id: int
    _subscriber_id: str


    def __init__(self, id_activity, id_subscriber):
        self._activity_id = id_activity
        self._subscriber_id= id_subscriber


    @classmethod
    def sendRequisition(self, activity_id: int) -> None:
        pass


    @classmethod
    def notifySubscriber(self) -> None:
        pass


    @classmethod
    def updateSubscriber(cls, new_subscriber_id: str) -> None:
        cls._subscriber_id = new_subscriber_id


    def to_json(self) -> dict:
        return{
            "id": self.id,
            "activity_id": self._activity_id,
            "subscriber_id": self._subscriber_id
        }