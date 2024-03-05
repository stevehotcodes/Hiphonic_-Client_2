import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token');
console.log(token);

export const GroupMemberApi = createApi({
  reducerPath: "GroupMemberApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['GroupMembers'],
  endpoints: (builder) => ({
    getGroupMembers: builder.query({
      query: (group_id) => ({
        url: `group-members/${group_id}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`    
        }
      }),
      providesTags: ['GroupMembers']
    }),
    addGroupMembertoAGroup: builder.mutation({
      query: (group_id) => ({
        url: `group-members/${group_id}`,
        method: 'POST',
        headers: {
          Authorization: `${token}`  
        },
        
        
      }),
      invalidatesTags:['GroupMembers']
    })
  })
});

export const { useGetGroupMembersQuery, useAddGroupMembertoAGroupMutation } = GroupMemberApi;
