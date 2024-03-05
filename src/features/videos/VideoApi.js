
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const videoApi = createApi({
 reducerPath:'videos',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), 
  tagTypes:['Videos'],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => 'video',
      method:'GET'
    }),
    provideTags:['Videos']
    
  }),
});

export const { useGetVideosQuery } = videoApi;
