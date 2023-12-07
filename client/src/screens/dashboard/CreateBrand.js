import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../store/services/brandService";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateBrand = () => {
  const [state, setState] = useState("");
  const [saveBrand, data] = useCreateMutation();
  console.log(data);
  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];
  const submitBrand = (e) => {
    e.preventDefault();
    saveBrand({ name: state });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.message));
      navigate("/dashboard/brands");
    }
  }, [data?.isSuccess, data?.data?.message, dispatch, navigate]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/brands" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> brands list
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submitBrand}>
        <h3 className="text-lg capitalize mb-3">create brand</h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <p className="alert-danger" key={key}>
              {error.msg}
            </p>
          ))}
        <div className="mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder="Brand Name..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value={data.isLoading ? "loading..." : "create brand"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateBrand;
