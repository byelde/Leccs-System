import { BrowserRouter, Navigate, Route, Routes as Switch } from "react-router-dom"
import { Homepage, Login } from "../pages"

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Homepage/>}/>
                <Route path="*" element={ <Navigate to={"/login"}/> }/>
            </Switch>
        </BrowserRouter>
    )
}