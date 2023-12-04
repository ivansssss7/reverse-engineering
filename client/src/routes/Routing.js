import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";
import UpdateCategory from "../screens/dashboard/UpdateCategory"
// import Products from "../screens/dashboard/Products";
import CreateModel from "../screens/dashboard/CreateModel";
import Models from "../screens/dashboard/Models"
import Private from "./Private";
import Public from "./Public";
const Routing = ()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="auth">
                <Route path="admin-login" element={<Public><AdminLogin/></Public>}></Route>
            </Route>
            <Route path="dashboard">
                <Route path="categories" element={<Private><Categories/></Private>}/>
                <Route path="models" element={<Private><Models/></Private>}/>
                <Route path="categories/:page" element={<Private><Categories/></Private>}/>
                <Route path="create-category" element={<Private><CreateCategory/></Private>}/>
                <Route path="update-category/:id" element={<Private><UpdateCategory/></Private>}/>
                <Route path="create-model" element={<Private><CreateModel/></Private>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;