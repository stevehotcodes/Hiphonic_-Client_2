import React from 'react';
import { useUpdateEventMutation } from './EventsSlice';
import close from '../../assets/close.png';
import Avatar from '../../assets/Avatar1.png';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/Toaster/Toaster';
import '../Events/updateEvents.scss';

const UpdateEvent = ({ closeUpdate, event }) => {
   console.log(event);
   const [updateEvent] = useUpdateEventMutation(); 

   const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.eventName.value;
      const description = e.target.eventDescription.value;
      const location = e.target.eventLocation.value;
      const photoUrl = e.target.eventurl.value; 
      const eventDate = e.target.eventDate.value; 
      const eventId = event.event_id;

      if (name === '' || description === '' || location === ""|| photoUrl === "") {
         ErrorToast("Please fill in all fields.");
      } else {
         try {
            const response = await updateEvent({ event_id: eventId, event_name: name, event_description: description, location: location, event_poster_url: photoUrl,event_date:eventDate });
            LoadingToast("Updating event...");
            SuccessToast(response.data.message);
            e.target.reset();
            closeUpdate();
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
                  <input
                     type="date"
                     placeholder="event date"
                     id='eventDate'
                     name='eventDate'
                  />
                  <div className="footer">
                     <div className="btn">
                        <button type="submit">Update Event</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default UpdateEvent;
