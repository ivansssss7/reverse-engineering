import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
    reducerPath:"product",
    tagTypes:"products",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/product",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token);
            headers.set("authorization", token ? `Bearer ${token}` : "");
            return headers;
        }
    }),
    endpoints:(builder)=>{
        return{
            create:builder.mutation({
                query: (name) => {
                    return {
                      url: "",
                      method: "POST",
                      body: name,
                    };
                  },
                  invalidatesTags: ["products"],
            })
        }
    }
})
export const {useCreateMutation} = productService
export default productService;