import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import AdminLogin from "../screens/auth/AdminLogin";
import Brands from "../screens/dashboard/Brands";
import CreateBrand from "../screens/dashboard/CreateBrand";
import UpdateBrand from "../screens/dashboard/UpdateBrand"
import Products from "../screens/dashboard/Products";
import CreateModel from "../screens/dashboard/CreateModel";
import CreateProduct from "../screens/dashboard/CreateProduct";
import Models from "../screens/dashboard/Models";
import Private from "./Private";
import Public from "./Public";
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Dashboard from "../screens/users/Dashboard";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="user" element={<Dashboard/>}/>
                <Route path="auth">
                    <Route path="admin-login" element={<Public><AdminLogin/></Public>}></Route>
                </Route>
                <Route path="dashboard">
                    <Route path="products" element={<Private><Products/></Private>}/>
                    <Route path="products/:page" element={<Private><Products/></Private>}/>
                    <Route path="brands" element={<Private><Brands/></Private>}/>
                    <Route path="brands/:page" element={<Private><Brands/></Private>}/>
                    <Route path="create-brand" element={<Private><CreateBrand/></Private>}/>
                    <Route path="update-brand/:id" element={<Private><UpdateBrand/></Private>}/>
                    <Route path="models" element={<Private><Models/></Private>}/>
                    <Route path="models/:page" element={<Private><Models/></Private>}/>
                    <Route path="create-model" element={<Private><CreateModel/></Private>}/>
                    <Route path="create-product" element={<Private><CreateProduct/></Private>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;
