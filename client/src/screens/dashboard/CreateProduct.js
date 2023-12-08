import { Link , useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Multiselect from 'multiselect-react-dropdown';
import Wrapper from "./Wrapper";
import toast, { Toaster } from 'react-hot-toast';
import { useAllModelsQuery } from "../../store/services/modelService";
import { useCreateMutation } from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";
import PicturePreview from "../../components/PicturePreview";
const CreateProduct = () => {
    const { data=[], isFetching } = useAllModelsQuery();
    const [value, setValue] = useState("")
    const [state, setState] = useState({
        modelId: [],
        system: "",
        name: "",
        specification:"",
        manufacturer: "",
        country:"",
        price: 0,
        quantity: 0,
        discount: 0,
        photo: ""
    });
    const [preview, setPreview] = useState({
        photo: ""
    });
    const pictureHandle = e => {
        if (e.target.files.length !== 0) {
            setState({ ...state, [e.target.name]: e.target.files[0] });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview({ ...preview, [e.target.name]: reader.result });
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleSelected = selectedModels => {
        setState({
            ...state,
            modelId: selectedModels.map(model => model.id)
        });
    }
    const handleInput = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const options = data?.models?.map(model => {
        return {
            id: model._id,
            brand: model.brandId.name,
            name: model.model,
            year: model.year,
            carBody: model.carBody,
            carEngine: model.carEngine,
            enginePower: model.enginePower,
            displayValue: `${model.brandId.name} ${model.model} ${model.year}
            ${model.carBody} ${model.carEngine} ${model.enginePower}`
        };
    });
    const [createNewProduct, response] = useCreateMutation();
    console.log("Your response: ", response);
    const createPro = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("data", JSON.stringify(state));
        formData.append("photo", state.photo)
        createNewProduct(formData);
    }
    useEffect(() => {
        if(!response.isSuccess) {
           response?.error?.data?.errors.map(err => {
               toast.error(err.msg);
           }) 
        }
     }, [response?.error?.data?.errors])
     const dispatch = useDispatch();
     const navigate = useNavigate();
     useEffect(() => {
         if(response?.isSuccess) {
             dispatch(setSuccess(response?.data?.msg));
            navigate('/dashboard/products');
         }
     }, [response?.isSuccess])
    return(
        <Wrapper>
            <ScreenHeader>
            <Link to="/dashboard/products" className="btn-dark">
                <i className="bi bi-arrow-left-short"></i> products list
            </Link>
            </ScreenHeader>
            <Toaster position="top-right" reverseOrder={true}/>
            <div className="flex flex-wrap -mx-3">
                <form className="w-full xl:w-8/12 p-3" onSubmit={createPro}>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="productType" className="label">car models</label>
                            <Multiselect
                                options={options}
                                groupBy="brand"
                                displayValue="displayValue"
                                id="css_custom"
                                onSelect={handleSelected}
                                onRemove={handleSelected}

                                style={{
                                    chips: {
                                      background: '#111827',
                                      color:"white"
                                      
                                    },
                                    multiselectContainer: {
                                      color: 'indigo'
                                    },
                                    searchBox: {
                                      border: 'none',
                                      'borderBottom': '1px solid blue',
                                      'borderRadius': '0px'
                                    },
                                      option: { // To change css for dropdown options
                                        color: "black",
                                      },

                                  }}
                                />
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="system" className="label">system</label>
                            <input type="text" name="system" className="form-control"
                            id="system" placeholder="system..." onChange={handleInput} value={state.system}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="specification" className="label">specification</label>
                            <input type="text" name="specification" className="form-control"
                            id="specification" placeholder="specification..." onChange={handleInput} value={state.specification}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="name" className="label">name</label>
                            <input type="text" name="name" className="form-control"
                            id="name" placeholder="name..." onChange={handleInput} value={state.name}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="manufacturer" className="label">manufacturer</label>
                            <input type="text" name="manufacturer" className="form-control"
                            id="manufacturer" placeholder="manufacturer..." onChange={handleInput} value={state.manufacturer}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="country" className="label">country</label>
                            <input type="text" name="country" className="form-control"
                            id="country" placeholder="country..." onChange={handleInput} value={state.country}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="price" className="label">price</label>
                            <input type="number" name="price" className="form-control"
                            id="price" placeholder="price..." onChange={handleInput} value={state.price}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="discount" className="label">discount</label>
                            <input type="number" name="discount" className="form-control"
                            id="discount" placeholder="discount..." onChange={handleInput} value={state.discount}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="quantity" className="label">quantity</label>
                            <input type="number" name="quantity" className="form-control"
                            id="quantity" placeholder="quantity..." onChange={handleInput} value={state.quantity}/>
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="photo" className="label">photo</label>
                            <input type="file" name="photo" id="photo"
                             className="input-file" onChange={pictureHandle}/>
                        </div>
                        <div className="w-full p-3">
                            <input type="submit" value={response.isLoading?"loading...":"save product"}
                            disabled={response.isLoading ? true :false} className="btn btn-indigo" />
                        </div>
                    </div>
                </form>
                <div className="w-full xl:w-4/12 p-3">
                        <PicturePreview url={preview.photo} heading="photo"/>
                </div>
            </div>
        </Wrapper>
    )
}
export default CreateProduct;
