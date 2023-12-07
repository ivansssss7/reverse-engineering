import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const brandService = createApi({
    reducerPath: "brand",
    tagTypes: "brands",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/brand",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token);
            headers.set("authorization", token ? `Bearer ${token}` : "");
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            create: builder.mutation({
                query: (name) => {
                    return {
                        url: "",
                        method: "POST",
                        body: name,
                    };
                },
                invalidatesTags: ["brands"],
            }),
            updateBrand: builder.mutation({
                query: (data) => {
                    return {
                        url: `/${data.id}`,
                        method: "PUT",
                        body: { name: data.name },
                    };
                },
                invalidatesTags: ["brands"],
            }),
            deleteBrand: builder.mutation({
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "DELETE",
                    };
                },
                invalidatesTags: ["brands"],
            }),
            get: builder.query({
                query: (page) => {
                    return {
                        url: `?page=${page}`,
                        method: "GET",
                    };
                },
                providesTags: ["brands"],
            }),
            fetchBrand: builder.query({
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    };
                },
                providesTags: ["brands"],
            }),
            allBrands: builder.query({
                query: () => {
                    return {
                        url: "",
                        method: "GET"
                    };
                },
                providesTags: ["brands"],
            })
        };
    }
});

export const {
  useCreateMutation,
  useGetQuery,
  useFetchBrandQuery,
  useAllBrandsQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation
} = brandService;
export default brandService;
