import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getFriends = createAsyncThunk('friends/getFriends', async () => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${authToken}`
      }
    };
    const response = await axios.get('http://localhost:3000/friendship', config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});


export const getMessagesByUser = createAsyncThunk('friends/getMessagesByUser', async (user_id) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${authToken}`
      }
    };
    const response = await axios.get(`http://localhost:3000/message/${user_id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


export const sendMessage = createAsyncThunk('friends/sendMessage', async ({ receiver_id, content }) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${authToken}`,
      },
    };

    const data = {
      receiver_id,
      content,
    };

    const response = await axios.post('http://localhost:3000/message', data, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


export const getMessagesBySender = createAsyncThunk('friends/getMessagesBySender', async () => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${authToken}`,
      },
    };

    const response = await axios.get('http://localhost:3000/message/sender', config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    entities: [],
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMessagesByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessagesByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(getMessagesByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = 'succeeded';
      
        state.messages = [];
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMessagesBySender.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessagesBySender.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(getMessagesBySender.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllFriends = (state) => state.friends.entities;
export const selectAllMessages = (state) => state.friends.messages;
export const getFriendsStatus = (state) => state.friends.status;
export const getFriendsError = (state) => state.friends.error;

export default friendsSlice.reducer;
