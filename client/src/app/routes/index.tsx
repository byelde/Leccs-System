import { BrowserRouter, Navigate, Route, Routes as Switch } from "react-router-dom"
import { Homepage, Login, MyEvents, ConsultEventsPage } from "../pages"

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/myevents" element={<MyEvents/>}/>
                <Route path="/events" element={<ConsultEventsPage/>}/>
                <Route path="*" element={ <Navigate to={"/login"}/> }/>
            </Switch>
        </BrowserRouter>
    )
}