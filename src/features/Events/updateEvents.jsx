import React from 'react';
import { useUpdateEventMutation } from './EventsSlice';
import close from '../../assets/close.png';
import Avatar from '../../assets/Avatar1.png'
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/Toaster/Toaster'
import '../Events/updateEvents.scss'

const UpdateEvent = ({ closeUpdate,event }) => {
   console.log(event);
   const [updateEvent, {  isLoading }] = useUpdateEventMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.eventName.value;
      const description = e.target.eventDescription.value;
      const location = e.target.eventLocation.value;
      if (name === '' || description === '' || location === "") {
         ErrorToast("fill both paths")
      } else {
         try {
            LoadingToast();
            const response = await updateEvent({event_id:id ,...data }).unwrap();
            SuccessToast(response.message);
            e.target.reset();
         } catch (error) {
            ErrorToast("error when updating an event")
         }
      }
   }

   return (
      <>
         <ToasterContainer />
         <div className="container">
            <form className='eventWrap' onSubmit={handleSubmit}>
               <div className="header">
                  <div className="side-profile">
                     <img src={Avatar} alt="nopic" />
                     <div className="side-text">
                        <h4>Angela lee</h4>
                        <p>@angalee</p>
                     </div>
                  </div>
                  <div className="close" onClick={closeUpdate}  >
                     <img src={close} alt="close" />
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
                        <button type="submit" disabled={isLoading}>update event</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

export default UpdateEvent;
