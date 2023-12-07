import Wrapper from "./Wrapper";
import { useState, useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAllBrandsQuery } from "../../store/services/brandService";
import { useCreateMutation } from "../../store/services/modelService";
import Spinner from "../../components/Spinner";
import { setSuccess } from "../../store/reducers/globalReducer";
const CreateModel = () => {
    const { data = [], isFetching } = useAllBrandsQuery();
    const [state, setState] = useState({
        brandId: "",
        model: "",
        year: 2023,
        carBody: "",
        carEngine: "",
        enginePower: ""
    });
    const handleInput = (e) => {
        if (e.target.name === "brands") {
          const selectedBrand = data.brands.find(
            (brand) => brand.name === e.target.value
          );
          setState({
            ...state,
            brandId: selectedBrand._id,
            [e.target.name]: e.target.value,
          });
        } else {
          setState({ ...state, [e.target.name]: e.target.value });
        }
      };
    const [createNewMode, response] = useCreateMutation();
    console.log("Your response: ", response);
    const createMod = e =>{
        e.preventDefault();
        setState({ ...state });
        const formData = new FormData();
        formData.append("data", JSON.stringify(state));
        createNewMode(formData);
        console.log(state);
    }

    useEffect(() => {
        if (!response.isSuccess) {
            response?.error?.data?.errors.map(err => toast.error(err.msg));
        }
    }, [response?.error?.data?.errors]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (response.isSuccess) {
            dispatch(setSuccess(response?.data?.msg));
            navigate("/dashboard/models");
        }
    }, [response?.isSuccess]);
    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/models" className="btn-dark">
                    <i className="bi bi-arrow-left-short"></i> models list
                </Link>
            </ScreenHeader>
            <Toaster position="top-right" reverseOrder={true}/>
            <div className="flex flex-wrap -mx-3">
                <form className="w-full xl:w-8/12 p-3" onSubmit={createMod}>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="brands" className="label">
                                brands
                            </label>
                            {!isFetching ? (
                                data?.brands?.length > 0 && (
                                    <select
                                        name="brands"
                                        id="brands"
                                        className="form-control"
                                        onChange={handleInput}
                                        value={state.brands}
                                    >
                                        <option value="">Choose brand</option>
                                        {data?.brands?.map(brand => (
                                            <option value={brand.name} key={brand._id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                )
                            ) : (
                                <Spinner />
                            )}
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="model" className="label">Model</label>
                            <input
                                type="text"
                                name="model"
                                className="form-control"
                                id="model"
                                placeholder="model..."
                                onChange={handleInput}
                                value={state.model}
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="year" className="label">Year</label>
                            <input
                                type="number"
                                name="year"
                                className="form-control"
                                id="year"
                                placeholder="year..."
                                onChange={handleInput}
                                value={state.year}
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="carBody" className="label">Car body</label>
                            <input
                                type="text"
                                name="carBody"
                                className="form-control"
                                id="carBody"
                                placeholder="Car body..."
                                onChange={handleInput}
                                value={state.carBody}
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="carEngine" className="label">Car engine</label>
                            <input
                                type="text"
                                name="carEngine"
                                className="form-control"
                                id="carEngine"
                                placeholder="Car engine..."
                                onChange={handleInput}
                                value={state.carEngine}
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="enginePower" className="label">engine power</label>
                            <input
                                type="text"
                                name="enginePower"
                                className="form-control"
                                id="enginePower"
                                placeholder="engine power..."
                                onChange={handleInput}
                                value={state.enginePower}
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <input
                                type="submit"
                                value={response.isLoading ? "loading...":"save product"}
                                disabled={response.isLoading ? true : false}
                                className="btn btn-indigo"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}
export default CreateModel;
