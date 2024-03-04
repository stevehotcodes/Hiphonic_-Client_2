import React from 'react';
import './Groups.scss';
import { FaEllipsis } from 'react-icons/fa6';
// import MaskGroup from '../../assets/Mask Group.png';
import { useDispatch } from 'react-redux';
// import { getGroups, getGroupsError, getGroupsStatus, selectAllGroups } from './groupAPI.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AddGroup from './addGroup';
import Modal from '../../components/Modal/Modal';
import '../../pages/Timeline/Addpost.scss';
import groupPlaceholder from '../../assets/unsplash_photo-6.png'
import { useAddGroupMembertoAGroupMutation, useGetGroupMembersQuery } from '../../features/Groups/groupMemberApi.js'
import { ClipLoader, PuffLoader } from 'react-spinners';
import { useGetGroupsQuery } from './groupAPI.js';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/Toaster/Toaster.jsx';
// import PuffLoader from 'react-spinners';
const Groups = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [joinedGroup,setJoinGroup]=useState(false);
  


  const [addGroupMembertoAGroup] = useAddGroupMembertoAGroupMutation();
  const {data:groups, isError, isLoading}=useGetGroupsQuery()
  console.log(`data:${groups}, error:${isError},isLoading:${isLoading}`)

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // useEffect(() => {
  //   console.log('Effect triggered');
  //   console.log('Status:', status);
  //   if (status === 'idle') {
  //     console.log('Dispatching getGroups');
  //     dispatch(getGroups());
  //   }
  // }, [status, dispatch]);
  


  const handleJoinGroup=async(group)=>{
    const {group_id}=group;   
    console.log(group)
 
          // console.log(response)

          try {
            const response=await addGroupMembertoAGroup(group_id).unwrap();
            console.log(response)
              LoadingToast
              SuccessToast(
                response.message
      )
       
            
          } catch (error) {

            console.log(error.data.message)
            ErrorToast(error.data.message)
             
          }
   


  }

  return (
    <>
    <ToasterContainer/>
     {isError && <div>Error:{error}</div>}
    
     <div className='groups-container'>
      <div className='group-header-wrapper'>
        <div className='group-header'>
          <span>Groups</span>
        </div>

        <div className='create-new-group-btn'>
          <button onClick={openModal}>+ Create New Group</button>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <AddGroup closeGroup={closeModal} />
            </Modal>
          )}
        </div>
        

        <div className='search-input-wrapper'>
          <input type='search' name='' id='' placeholder='search for groups' />
        </div>
      </div>

      <div className='suggested-for-you-wrapper'>
       
        <div className='suggested'>
            <span>Suggested for you</span>
            <span>Groups you might be interested </span>    
        </div>
        <span>See All</span>
        <div className="groups-card-container">
        {isLoading  && (<PuffLoader color="#000" loading={true} size={150} />)}
        {groups &&
          groups.map((group) => (
            
            <div className='group-card' key={group.group_id}>
              <div className='group-name'>
                <div className='group-icon'>
                  <span>Group Icon</span> 
                </div>
                <div className='group-details'>
                  <span>{group.group_name}</span> 
                  <span>{group.group_description}</span> 
                </div>
                <FaEllipsis />
              </div>
              <div className='group-image'>
                <img src={groupPlaceholder} alt='' /> 
              </div>
              <div className='join-group-btn'>
                <button onClick={()=>handleJoinGroup(group)}>Join group</button>
              </div>
            </div>
          ))}
        </div>
       
      </div>

      <div className='recent-activity'></div>
    </div>
    
    
    
    </>
   
  );
};

export default Groups;
