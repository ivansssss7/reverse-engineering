import { useSelector } from "react-redux";
import AccountList from "../../components/home/AccountList";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";

const Dashboard = ()=>{
    const {user} = useSelector(state => state.authReducer);
    return(
        <>
        <Nav/>
        <div className="">
            <Header>
                my account
            </Header>
            <div className="my-container mt-[80px]">
                <div className="flex flex-wrap -mx-6">
                    <div className="w-full md:w-4/12 p-6">
                        <AccountList/>
                    </div>
                    <div className="w-full md:w-8/12 p-6">
                        <h1 className="heading">name</h1>
                        <span className="block mt-3 capitalize font-medium">{user?.name}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;