

import loginReducer from '../pages/Login/AuthenticationSlice'


// import friends from "../features/Friends/FriendsSlice";

import registrationReducer from '../features/Register/registerSlice'
import friendsReducer from '../features/Friends/FriendsSlice'
import profileReducer from '../pages/Profile/ProfileSlice'


import postReducer from '../features/Posts/PostSlice'
import { commentSlice } from '../features/comments/commentSlice'
import { notificationAPI } from "../features/Notifications/NotificationAPi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from '@reduxjs/toolkit';
import { photosApi } from '../features/photos/photosApi';
import { EventApi } from '../features/Events/EventsSlice';
import {GroupMemberApi} from '../features/Groups/groupMemberApi'
import { GroupApi } from '../features/Groups/groupAPI'
import { videoApi } from '../features/videos/VideoApi'

export const store =configureStore({
    reducer:{
        

        friends: friendsReducer,

        authentication:loginReducer,

        registration:registrationReducer,

        profile:profileReducer,

        posts:postReducer,
        [commentSlice.reducerPath]:commentSlice.reducer,

        [notificationAPI.reducerPath]:notificationAPI.reducer,
        
        [photosApi.reducerPath]:photosApi.reducer,
        [EventApi.reducerPath]:EventApi.reducer,
        [GroupApi.reducerPath]:GroupApi.reducer,
        [GroupMemberApi.reducerPath]:GroupMemberApi.reducer,
        [videoApi.reducerPath]:videoApi.reducer,
        
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        commentSlice.middleware,
        notificationAPI.middleware,
        photosApi.middleware,
        EventApi.middleware,
        GroupApi.middleware,
        GroupMemberApi.middleware,
        videoApi.middleware
    ),
})

setupListeners(store.dispatch)

