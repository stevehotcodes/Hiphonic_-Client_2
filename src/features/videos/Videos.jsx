

import React, { useState } from 'react';
import search from "../../assets/search.png";
import "../videos/Videos.scss"
//import VideoUpload from '../components/VideoUpload';
import { useSelector } from 'react-redux';
import { fetchVideos } from './VideoSlice';
import { useGetVideosQuery } from './VideoApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import { CircleLoader, PuffLoader } from 'react-spinners';

const Videos = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isMuted, SetIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const dispatch=useDispatch()
   const {data:videos, isLoading, isFetching, isError} = useGetVideosQuery();
   console.log("logged videos", videos);

  console.log(`data: ${videos}, isLoading: ${isLoading}, isError: ${isError}, isFetching:${isFetching}`)

  // useEffect(async()=>{
  //  const response= await dispatch(fetchVideos);
  //  //const response= await useGetVideosQuery
  //  console.log(response)
  // })
  

  const handleUploadButtonClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  const toggleMute = () =>{
    SetIsMuted(!isMuted);

  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (<>
   <VideoUpload/>
    <div className="Video-container">
      <p>ttht</p>
      <div className="see-more-videos">
        <div className="video1">
          <div className="video-header">
            <h2>Video</h2>
            <img src={search} alt="" />
          </div>
          <div className="text-in-categories">
            <h3>Categories To Explore</h3>
            <p>see all</p>
          </div>
          <div className="explore-categories">
          {isLoading  &&<PuffLoader loading={true} color='#000' size={150} />}
          <div>
          {videos&&videos.map((video,index)=>(
            <div key={index} className='videoWrapper'>
              
                <video
                      width="320"
                      height="240"
                      autoPlay={!isPaused}
                      muted={isMuted}
                      controls
                      // onClick={togglePause}
                    >
                      <source src={video.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-controls">
                      <button onClick={toggleMute}>{isMuted? 'Unmute': 'Mute'}</button>
                      <button onClick={togglePause}>{isPaused ? 'Play' : 'Pause'}</button>
                    </div>
          </div>
              
              
            ))}
          </div>
         
            
          </div>
        </div>
      </div>

      <div className="minutes-ago-video">
    
      </div>
    </div></>
   
 );
};

export default Videos;
