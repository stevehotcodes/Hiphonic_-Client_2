
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'http://localhost:3000/';


const token = localStorage.getItem('token')
export const commentSlice = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set('Authorization', ` ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ post_id, content }) => ({
        url: `comment/${post_id}`,
        headers:{
          Authorization: `${token}`
        },
        method: 'POST',
        body: {content,post_id }
      }),
    }),

  }),
});

export const { useAddCommentMutation } = commentSlice;
export default commentSlice
