import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
const Models = () => {
    return (
        <Wrapper>
        <Link to="/dashboard/create-model" className="btn-dark">add car model
        </Link>
        </Wrapper>
    )
}

export default Models;