import React from 'react'
import { useAddEventMutation } from './EventsSlice'
import close from '../../assets/close.png'
import Avatar from '../../assets/Avatar1.png'
import './createEvent.scss'
import { useState } from 'react'
import { ToasterContainer, ErrorToast, LoadingToast,SuccessToast} from '../../components/Toaster/Toaster'

const CreateEvent = ({isEventOpen}) => {
   const [isEventclose ,setEventOpen] = useState(false)
   
   const [addEvent, { error, isLoading }] = useAddEventMutation();
   if (error) {
      return <h1>error..</h1>
   }
   if (isLoading) {
      return <h1>loading...</h1>

   }

const handleClose=()=>{
   setEventOpen(isEventclose)
}
   const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.eventName.value;
      const description = e.target.eventDescription.value;
      const location = e.target.eventLocation.value;
      if (name === '' || description === '' || location === "") {
         ErrorToast("fill both paths")
      } else {
         try {
            const response = await addEvent({ event_name: name, event_description: description, location: location }).unwrap();
         LoadingToast
         SuccessToast(response.message)
            return (response.message),
               e.target.reset();

         } catch (error) {

         }
      }
   }
   return (
      <>
      <ToasterContainer/>
         <form className='eventWrap' onSubmit={handleSubmit}>
         <div className="header">
            <div className="side-profile">
               <img src={Avatar} alt="nopic" />
               <div className="side-text">
                  <h4>Angela lee</h4>
                  <p>@angalee</p>
               </div>
            </div>
            <div className="close" onClick={handleClose}  >
               <img src={close} alt="close"  />
              
            </div>
         </div>

            <div className="textarea">
               <input
                  placeholder="Eventname.."
                  id='eventName'
                  name='eventName'
               />
               <input
                  type="text"
                  placeholder="Description"
                  id='eventDescription'
                  name='eventDescription'
               />
               <input
                  type="text"
                  placeholder="location"
                  id='eventLocation'
                  name='eventLocation'
               />
               <input
                  type="text"
                  placeholder="photourl"
                  id='eventurl'
                  name='eventurl'

               />

            <div className="footer">
               <div className="btn">
               
                  <button type="submit" LoadingToast >Create event</button>
               </div>
            </div>
            </div>


         </form>



      </>
   )
}

export default CreateEvent