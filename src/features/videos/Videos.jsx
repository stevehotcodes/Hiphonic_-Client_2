

import React, { useState } from 'react';
import search from "../../assets/search.png";
import "./Videos.scss";
import VideoUpload from '../components/VideoUpload'; // Add this

const Videos = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadButtonClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  return (
    <div className="Video-container">
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
            <div className="video-container">
              {/* ... (existing code) */}
            </div>
          </div>
        </div>
      </div>

      <div className="minutes-ago-video">
        {/* ... (existing code) */}

        <button onClick={handleUploadButtonClick}>Upload Video</button>

        {showUploadModal && (
          <div className="upload-modal">
            <VideoUpload onClose={handleUploadModalClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
