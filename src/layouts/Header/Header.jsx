import React from 'react'
import chatbubble from ".././../assets/chatbubble-ellipses-outline.svg";
import AppReducer, { initialState } from '../../reducers/AppReducers';
import notification_icon from '../../assets/notifications-outline.svg'
import '../Header/Header.scss'


import Avatar from "../../assets/Avatar1.png";
import { IoIosMenu } from "react-icons/io";
import { useReducer } from 'react';
import { useState } from 'react';
import RightSideBarMobile from '../RightSideBar-mobile/RightSideBarMobile';
import Notification from '../../pages/Notification/Notification'
import SideMenu from '../../layouts/SideMenu/SideMenu';
import { useGetNotificationsQuery } from '../../features/Notifications/NotificationAPi';
import Messages from '../../pages/Messages/Messages';




const Header = () => {



  // const {data:notifications, error, isLoading, isError, isFetching } = useGetNotificationsQuery();
    const [isOpen, setOpen] = useState(false);
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    // console.log(notifications, "from notifications")
    const handleNavigationOpen = () => {
        dispatch({ type: "SET_NAVIGATION_OPEN", payload: true });
        console.log("state set to true");
      };
    
      const handleNavigationClose = () => {
        dispatch({ type: "SET_NAVIGATION_OPEN", payload: false });
      };
      
    
    
      const handleMenuOpen=()=>{
        console.log("menu actiion")
        console.log(state.isMenuOpen)
        // dispatch({type:"SET_MENU_OPEN",payload:false})
        dispatch({type:"SET_RIGHT MENU_OPEN",payload:false})
    
        !state.isMenuOpen?
          dispatch({type:"SET_MENU_OPEN",payload:true}):
          dispatch({type:"SET_MENU_OPEN",payload:false})
    
    
          dispatch({type:"SET_RIGHT MENU_OPEN",payload:false})
    
      }
    
      const handleMenuClose=()=>{
        dispatch({type:"SET_RIGHT MENU_OPEN",payload:false})
      }
    
    
      const handleRightBarOpen=()=>{
        console.log("right side open");
    
        !state.isRightBarOpen?
         dispatch({type:"SET_RIGHT_MENU_OPEN",payload:true}):
         dispatch({type:"SET_RIGHT_MENU_OPEN",payload:false})
    
         dispatch({type:"SET_MENU_OPEN",payload:false})
         
        console.log(state.isRightBarOpen)
      }
    





  return (
  <div className="header-wrapper">
      
  <div className="logo-img">
    <img
      src="src/assets/logo.png
          "
      alt=""
    />
   <div className="menu-name-icon">
      <div className="menu-name" onClick={handleMenuOpen}>
          <IoIosMenu />
         <span>Menu</span>
        </div>
   <IoIosMenu  onClick={handleRightBarOpen} />
   </div>
    
  </div>
  <div className="search-wrapper">
    <img src="src/assets/search-outline.svg" alt="" />
    <input type="search" name="" id="" placeholder="search" />
  </div>
    
  <div className="header-actions">
    <div className="actions">
      <img src={chatbubble} alt="chat" />
      <img
        src={notification_icon}
        alt="noti1fication"
        onClick={handleNavigationOpen}
      />
      <div className='notifications-counter'></div>

      <img src={Avatar} alt="avatar" />
    </div>
  </div>

<div>
  {state.isNavigationOpen && (
    
    <Notification handleOnClose={handleNavigationClose}  />
  )}
</div>
{/* <div> */}
  {
    state.isMenuOpen &&(
      <SideMenu handleOnClose={handleMenuClose} />
    )
  }

  {
    state.isRightBarOpen&&(
      <RightSideBarMobile />
    )
  }

{/* </div> */}

  {
    state.isMessagePageOpen&&(
      <Messages/>
    )
  }

</div>
);
}

export default Header