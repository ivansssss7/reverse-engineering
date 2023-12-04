import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const modelService = createApi({
    reducerPath:"model",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/",
        prepareHeaders:(headers, {getState})=>{
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token);
            headers.set("authorization", token ? `Bearer ${token}` : "");
            return headers;
        }
    }),
    endpoints:(builder)=>{
        return {
            cModel: builder.mutation({
                query:(data)=>{
                    return{
                        url:"/create-model",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags: ['models']
            })
        }
    }
})
export const {useCModelMutation} = modelService;
export default modelService;