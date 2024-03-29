import React from 'react'
import ProfileCompletion from '../../components/ProfileCompletion/ProfileCompletion'
import Intro from '../../components/Intro/Intro'
import PhotoSideBar from '../../components/PhotoSideBar/PhotoSideBar'
import PostDiv from '../../components/PostDiv/PostDiv'
import PostContent from '../../components/PostContent/PostContent'
import Avatar from '../../assets/Avatar1.png'
import '../Profile/Profile.scss'
import backgroundImage from '../../assets/background.jpeg'
import profilePhoto from "../../assets/Avatar1.png"
import heart from "../../assets/heart-outline.svg"
import comments_icon from '../../assets/chatbubble-ellipses-outline.svg'
import star_icon from '../../assets/star-outline.svg'
import happy_icon from '../../assets/happy-outline.svg'
import content from '../../assets/content-photo-1.png'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getProfileError, getProfileStatus, getUserDetails, selectProfile } from './ProfileSlice'
import { useEffect } from 'react'
import { getFriends, selectAllFriends } from '../../features/Friends/FriendsSlice'
import { useReducer } from 'react'
import AppReducer, { initialState } from '../../reducers/AppReducers'
import EditProfile from '../../features/Profile/EditProfile'
import { useState } from 'react'
import { PuffLoader } from 'react-spinners'


const Profile = () => {
   
    const reduxDispatch=useDispatch();
    const profile=useSelector(selectProfile);
    const status=useSelector(getProfileStatus);
    const error=useSelector(getProfileError);
    const user_id=localStorage.getItem('user_id')
    const friends=useSelector(selectAllFriends);
    // const [state, dispatch] = useReducer(AppReducer, initialState);
    const [showUpdateModal,setShowUpdateModal]=useState(false);

    const toggleUpdateModal=()=>{
        console.log(showUpdateModal)
        setShowUpdateModal(!showUpdateModal)
        
    }
    
   
    

    const accountDetails=[
        {
            avatar:Avatar,
            full_name:'Angela Lee',
            username:'@angela lee'
        }
    ]

    const accountStats=[
        {
            type:'Posts',
            total:78
        },
        {
            type:'FRIENDS',
            total:friends.length
        },
        {
            type:'PHOTS',
            total:2978
        },
        {
            type:'LIKES',
            total:'102.68K'
        },

    ]



    
const userDetails=[
    {
        profilePhoto:profilePhoto,
        username:'Angela',
        time:"56 min ago"
    },
    {
        profilePhoto:profilePhoto,
        username:'Angela',
        time:"56 min ago"
    }
]


 const actions=[
    {
        action_icon:heart,
        action_type:'Likes'
    },

    {
        action_icon:comments_icon,
        action_type:'Comments'
    },

    {
        action_icon:star_icon,
        action_type:'Activity'
    },
 ]




 useEffect(()=>{
    const user_id=localStorage.getItem('user_id')
    console.log("user oif in the fetch",user_id)
      if(status==='idle'){
         reduxDispatch(getUserDetails(user_id))
        //  dispatch(getFriends())
         console.log(profile)
      }

 },[status, reduxDispatch])



 const handleEditOpen = () => {
    
    dispatch({ type:"SET_EDIT_PROFILE_OPEN", payload: true });
    console.log("state set to true");
    console.log(state.isEditProfileOpen)
  };


const handleEditClose=()=>{

    dispatch({ type:"SET_EDIT_PROFILE_OPEN", payload: false });   
    console.log(state.isEditProfileOpen)   
}

console.log(profile)
console.log(user_id)
console.log("friends",friends)






    return(<>
    {(status==='loading')?
        (<div className="status-loader">
          <div className='status-loader-content'>
           <PuffLoader loading={true} size={250} /> 
           <p>Please wait........</p>
          </div>
    
         
        </div>):<div className='content-container'>
            <div className='image-wrapper'>
                <img src={backgroundImage} alt="" />
                {/* <button class='edit-btn' onClick={handleEditOpen}> Edit profile</button> */}
                <button type="button" class='edit-btn' onClick={toggleUpdateModal} >{showUpdateModal?'Close':'update'}</button>
                {
                    showUpdateModal &&(<EditProfile profile={profile} closeModal={toggleUpdateModal}/>)
                }
            </div>
            <div className='account-details'>
                {
                   
                                <div className='avatar-name-div'><img className='avatar' src={Avatar} alt="" /><div className='content-user-name' >
                                    <h5>{profile.username}</h5>
                                    <p>{profile.tagname}</p>

                                </div></div>
                         
                }
                
                <div className='account-stats'>
                    
                        {
                            accountStats&&
                                accountStats.map((item,index)=>{
                                    const{type,total}=item
                                        return(     
                                            <div className='posts-number' key={index}>
                                                <h5>{type}</h5>
                                                 <p >{total}</p>
                                             </div>
                                                                                
                                        )
                                })
                        }
                </div>
                
            </div>
            <div className='post-wrapper'>
                <div className='left-post-wrapper'>
                        <ProfileCompletion/>
                        <Intro profile={profile}/>
                        <PhotoSideBar/>

                </div>

                <div className='right-post-wrapper'>
                    <PostDiv/>
                    <PostContent  userDetails={userDetails} actions={actions}/>
                    <PostContent  userDetails={userDetails} actions={actions}/>
                    <PostContent  userDetails={userDetails} actions={actions}/>
                   
                    
                </div>
            </div>

        </div>
        
        
        }
    
    
    
    </>


        
        
        
    )
}

export default Profile