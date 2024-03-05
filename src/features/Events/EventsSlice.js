import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem('token')
console.log(token)
export const EventApi = createApi({
  reducerPath: "Events",
tagTypes:["events"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url:`event`,
        method:"GET",
        headers: {
          Authorization: `${token}`
        }
      }),
     
    }),
    addEvent: builder.mutation({
      query: (event) => ({
        url: `event`,
        method: "POST",
        headers: {
          Authorization: `${token}`
        },
        body: event, 
       
      }),
      invalidatesTags:["events"]
    }),
    updateEvent:builder.mutation({
      query:(event) =>({
        url:`event/${event.event_id}`,
        method:"PUT",
        body:event,
        headers:{
          Authorization: `${token}`
        }
      }),
      invalidatesTags:["events"]
    }),
    registerEvent:builder.mutation({
      query:(event_id)=>({
        url:`event/attendees/${event_id}`,
        method:"POST",
        headers:{
          Authorization: `${token}`
        }
      }),
      invalidatesTags:["events"]
    }),

    deregisterEvent:builder.mutation({
       query:(event_id)=>({
         url:`event/attendees/${event_id}`,
         method:'DELETE',
         headers:{
          Authorization: `${token}`
        }
         
       }),
       invalidatesTags:["events"]
    })
    
  })
});
export const {useGetAllEventsQuery,useAddEventMutation,useUpdateEventMutation,useRegisterEventMutation,useDeregisterEventMutation} = EventApi;








