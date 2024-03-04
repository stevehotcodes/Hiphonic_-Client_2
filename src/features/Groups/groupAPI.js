import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = localStorage.getItem('token');
console.log(token);



export const GroupApi=createApi({
    reducerPath:'GroupApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
    tagTypes: ['Groups'],
    endpoints: (builder) => ({
        getGroups: builder.query({
          query: () => ({
            url: `group`,
            method: 'GET',
            
          }),
          providesTags: ['Groups']
        }),

        createGroup:builder.mutation({
             query:(group)=>({
                url:`group`,
                method:'POST',
                headers: {
                    Authorization: `${token}`  
                  },
                body:group
             }),
            
        })
      })
    });



export const {useGetGroupsQuery,useCreateGroupMutation}=GroupApi