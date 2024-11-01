import { BrowserRouter, Navigate, Route, Routes as Switch } from "react-router-dom"
import { Login } from "../pages"

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={ <Navigate to={"/login"}/> }/>
            </Switch>
        </BrowserRouter>
    )
}