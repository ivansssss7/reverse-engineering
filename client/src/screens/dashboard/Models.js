import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducers/globalReducer";
import toast, { Toaster } from "react-hot-toast";
import { useGetModelsQuery } from "../../store/services/modelService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";

const Models = () => {
    let { page } = useParams();
    if (!page) {
        page = 1;
    }

    const { data = [], isFetching } = useGetModelsQuery(page);
    console.log(data);
    const { success } = useSelector(state => state.globalReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        return () => {
            dispatch(clearMessage());
        }
    }, []);

    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/create-model" className="btn-dark">
                    create model
                </Link>
                <Toaster position="top-right"/>
            </ScreenHeader>
            {!isFetching?data?.models?.length > 0 ? (
                <div>
                    <table className="w-full bg-gray-900 rounded-md">
                        <thead>
                            <tr className="border-b border-gray-800 text-left">
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">car brand</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">model name</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">year</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">car body</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">car engine</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">engine power</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">edit</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.models?.map(model => (
                               <tr className="odd:bg-gray-800" key={model._id}>
                                  {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.brandName}</td> */}
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.brandId.name}</td>
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.model}</td>
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.year}</td>
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.carBody}</td>
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.carEngine}</td>
                                  <td className="p-3 capitalize text-sm font-normal text-gray-400">{model.enginePower}</td>
                                  <td className="p-3 capitalize texy-sm font-normal text-gray-400 ">
                                      <Link to={`/dashboard/edit-model/${model._id}`} className="btn btn-warning">
                                          edit
                                      </Link>
                                  </td>
                                  <td className="p-3 capitalize texy-sm font-normal text-gray-400 ">
                                      <Link to={`/dashboard/edit-model/${model._id}`} className="btn btn-danger">
                                          delete
                                      </Link>
                                  </td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : "no models" : <Spinner />}
        </Wrapper>
    );
}

export default Models;
