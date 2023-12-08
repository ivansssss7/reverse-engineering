import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";
import { useGetProductsQuery } from "../../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Input from "../../components/Input";
const Products = () => {

  let { page } = useParams();
  if(!page){
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);
  console.log(data);

  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, [success, dispatch]);


  return (
    <Wrapper>
        <ScreenHeader>
      <Link to="/dashboard/create-product" className="btn-dark">
        create product
      </Link>
      <Toaster position="top-right" />
      <Input
       name="autopart-search"
       placeholder="Search by autopart name"/>
      </ScreenHeader>
      {!isFetching ?data?.spareParts?.length>0 ? <div>
        <table className="w-full bg-gray-900 rounded-md">
                        <thead>
                            <tr className="border-b border-gray-800 text-left">
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">name</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">car models</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">manufacturer</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">specification</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">system</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">price</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">stock</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">photo</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">edit</th>
                                <th className="p-3 uppercase text-sm font-medium  text-gray-600">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                          {data?.spareParts?.map(sparePart=>(
                            <tr className="odd:bg-gray-800" key={sparePart._id}>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.name}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.modelId}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.manufacturer}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.specification}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.system}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">${sparePart.price}.00</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">{sparePart.quantity}</td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400">
                                <img src={`/images/${sparePart.picture}`} alt="image name" className="w-20 h-20 rounded-md object-cover"/>
                              </td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={``} className="btn btn-warning">edit</Link></td>
                              <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={``} className="btn btn-danger">delete</Link></td>
                            </tr> 
                          ))}
                        </tbody>
                    </table>
      </div> :"No products"  : <Spinner/>}
    </Wrapper>
  );
};

export default Products;
