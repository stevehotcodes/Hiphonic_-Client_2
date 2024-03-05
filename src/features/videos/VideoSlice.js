import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const  initialState={ videos: [], status: 'idle', error: null }

export const fetchVideos = createAsyncThunk('videos/fetchVideo', async () => {
  try {
    const response = await axios.get('http://localhost:3000/video');
    console.log(response.data)
    return response.data
   
    
  } catch (error) {
    return error;
  }
});


export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// export { fetchVideos }
export const selectAllVideos=(state)=>state.videos.videos
export const getVideosStatus=(state)=>state.videos.status
export const getVideosErrors=(state)=>state.videos.error

export default videoSlice.reducer;
