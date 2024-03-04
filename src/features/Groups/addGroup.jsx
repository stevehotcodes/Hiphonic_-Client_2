import React from 'react'
import '../../features/Groups/addGroup.scss'
import '../../pages/Timeline/Addpost.scss'
import { useState } from 'react'
// import {createGroup} from './groupAPI'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useCreateGroupMutation } from './groupAPI'
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/Toaster/Toaster'

const AddGroup = ({closeGroup}) => {
    const dispatch = useDispatch();
    const [groupName,setGroupName]=useState('');
    const [groupDescription, setGroupDescription]=useState('');
    const [createGroup,{error,isLoading}]=useCreateGroupMutation()
      
    
 

    
      
    const handleCreateGroup=async(e)=>{
      // alert("creeate grouo dialog box")
        e.preventDefault();
        const groupName=e.target.groupName.value;
        const groupDescription=e.target.groupDescription.value
        console.log(groupName,groupDescription)
        
        if(groupName==='' && groupDescription===''){
           ErrorToast('fill the inputs')
        }
        else{
                try {
                  const response = await createGroup({group_name:groupName,group_description:groupDescription}).unwrap();
                  console.log("response from group creation", response)
                
                  LoadingToast
                 
                  SuccessToast(response.data.message)
                  setTimeout(()=>{
                    closeGroup()
                  },2000)
                 
                    return (response.data.message),
                       e.target.reset()
                      
                     
                } catch (error) {
                  console.log("this is error",error.data.message);
                  ErrorToast(error.data.message)
                  setTimeout(()=>{
                    closeGroup()
                  },2000)
                  e.target.reset()
                    // 
                }
        
          }
        }


    

  return (
    <>
    <ToasterContainer/>
    <div className='add-group-modal'>
 

 <form action="" onSubmit={handleCreateGroup}>
   <h3 className='create-group-header'>Create Group</h3>
    <div className="textarea">
        <input  placeholder='group name' id='groupName'
           onChange={(e)=>{setGroupName(e.target.value)}}
        
        />

        </div>

   <div className="textarea">
      <input type="text" placeholder='group description' id='groupDescription'
            onChange={(e)=>{setGroupDescription(e.target.value)}}
         
         />
   </div>
       
        <div className="footer">
         <div className="btn">
            <button type='submit' >Create</button>
         </div>
         </div>
      </form>


   
   
   
      
    
    </div></>
  )
}

export default AddGroup