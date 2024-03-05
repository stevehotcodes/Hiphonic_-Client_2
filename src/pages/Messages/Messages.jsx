import React from 'react'
import "../Messages/Messages.scss"
import { useSelector } from 'react-redux';
import { getMessages, selectAllMessages } from '../../features/Friends/FriendsSlice';
import { getMessagesByUser } from '../../features/Friends/FriendsSlice';
// import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Messages = ({handleOnClose}) => {
    const messages = useSelector(selectAllMessages);
    const dispatch=useDispatch()
    const[isLoading,setLoading]=useState(true);
    useEffect(async()=>{
        if(isLoading){
          const response=await dispatch(getMessages)
          console.log(response)

        
        }
    })
    


  return (



    <>
        {/* {isError && <div>Error: {error.data}</div>} */}
     {/* {isLoading ||
            (isFetching && <ClipLoader color="#000" loading={true} size={150} />)} */}
          <div className="notification-wrapper" >
            <div className="notification-content-container">
              <div className="title-bar">
                <p className="notification-title"> Messages</p>
                <button type="button" onClick={handleOnClose}>
                  x
                </button>
              </div>
    
              <div className="notification-menu">
                <span>All Messages</span>
                <span>Unread</span>
              </div>
              
              <div className="notifications-content">
                {/* {notifications &&
                  notifications.map((item, index) => {
                    return (
                      <div className="notifications" key={index}>
                        <div className="user-wrapper">
                          <img src={Avatar} alt="" />
                          <div className="names">
                            <span className="username">{item.username}</span>
                            <span>Liked a post </span>
                          </div>
                        </div>
                        <span className="time">{item.notification_time}</span>
                       <span class="icon">🔍</span>
                          
                        
                    
                      </div>
                    );
                  })} */}
              </div>
            </div>
          </div>
        </>
  )
}

export default Messages