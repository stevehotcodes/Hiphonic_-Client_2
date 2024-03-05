import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { ClipLoader, PuffLoader } from 'react-spinners';

const VideoUpload = ({ onClose }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('token');

  const handleDrop = (acceptedFiles) => {
    setVideoFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    try {
      // Step 1: Upload the video file
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append("upload_preset", "maold1b5");

      setUploading(true);


      const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/dorsnetyf/video/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      setVideoUrl(uploadData.secure_url);

      // Step 2: Save the data after the upload is complete
      const saveData = {
        "video_description": null,
        "video_url": uploadData.secure_url,
      };

      const response = await axios.post('http://localhost:3000/video', saveData, {
        headers: {
          'Content-Type': 'application/json', // Change to 'application/json' if server expects JSON
          'Authorization': `${token}`,
        },
      });

      onClose();
    } catch (error) {
      console.error('Error uploading video:', error.response ? error.response.data.error : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Video Upload</h2>
      <Dropzone onDrop={handleDrop} accept="video/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a video file here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {videoFile && (
        <div>
          <p>Selected Video: {videoFile.name}</p>
     
          <button onClick={handleUpload}>{uploading ? 'Uploading...' : 'Upload'}</button>

          {uploading&&<div className="status-loader">
            <div className='status-loader-content'>
              <PuffLoader loading={true} size={150} />
              <p>Please wait ...... as  the video is being uploaded</p>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
};
//use the react dropzone
const dropzoneStyles = {
  width: '300px',
  height: '150px',
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  margin: '20px',
};

export default VideoUpload;
