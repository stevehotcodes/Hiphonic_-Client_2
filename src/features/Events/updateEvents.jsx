import React from 'react';
import { useUpdateEventMutation } from './EventsSlice';
import close from '../../assets/close.png';
import Avatar from '../../assets/Avatar1.png';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/Toaster/Toaster';
import '../Events/updateEvents.scss';

const UpdateEvent = ({ closeUpdate, event }) => {
   console.log(event);
   const [updateEvent, { isLoading }] = useUpdateEventMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.eventName.value;
      const description = e.target.eventDescription.value;
      const location = e.target.eventLocation.value;
      const eventId = event.id;

      if (name === '' || description === '' || location === "") {
         ErrorToast("Please fill in all fields.");
      } else {
         try {
            LoadingToast();
            const response = await updateEvent({ eventId, name, description, location }).unwrap();
            SuccessToast(response.message);
            e.target.reset();
         } catch (error) {
            ErrorToast("Error when updating the event.");
         }
      }
   };

   return (
      <>
         <ToasterContainer />
         <div className="container">
            <form className='eventWrap' onSubmit={handleSubmit}>
               <div className="header">
                  <div className="side-profile">
                     <img src={Avatar} alt="nopic" />
                     <div className="side-text">
                        <h4>Angela Lee</h4>
                        <p>@angalee</p>
                     </div>
                  </div>
                  <div className="close" onClick={closeUpdate}>
                     <img src={close} alt="close" />
                  </div>
               </div>

               <div className="textarea">
                  <input
                     placeholder="Event name.."
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
                     placeholder="Location"
                     id='eventLocation'
                     name='eventLocation'
                  />
                  <input
                     type="text"
                     placeholder="Photo URL"
                     id='eventurl'
                     name='eventurl'
                  />
                  <div className="footer">
                     <div className="btn">
                        <button type="submit" disabled={isLoading}>Update Event</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default UpdateEvent;
