import map from "../../assets/40px.png";
import "./EventsHandler.scss";
import { useDeregisterEventMutation, useGetAllEventsQuery, useRegisterEventMutation } from "../../features/Events/EventsSlice";
import UpdateEvent from "../../features/Events/updateEvents";
import { useState } from "react";
import dots from '../../assets/dots.png'
import ReactDOM from 'react-dom';
import { SuccessToast, ToasterContainer, LoadingToast, ErrorToast } from "../Toaster/Toaster";
import { set } from "react-hook-form";

const EventsHandler = () => {
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [clickedEvents, setClickedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);
  


  const { data: events, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const [registerEvent, { isLoading: registerLoading, isError: registerError }] = useRegisterEventMutation();
  const[deregisterEvent]=useDeregisterEventMutation()

  const openUpdate = (event) => {
    setSelectedEvent(event);
    setUpdateOpen(true);
  };

  const closeUpdate = () => {
    setUpdateOpen(false);
  };

  const handleRegister = async (event,index) => {
  
    try {
      const { event_id } = event;
    
        setClickedEvents([...clickedEvents, event_id]);
        LoadingToast("Registering...");
        const response = await registerEvent(event_id);
        SuccessToast(response.data.message);
        setIsRegistered(true);
      
    } catch (error) {
      ErrorToast("Failed to register for the event");
    }
  };

  const handleOptOut =async (event,index) => {
     try {
      setClickedEvents([...clickedEvents, event.event_id]);
  
      const{event_id}=event
      
      console.log(event)
      const response = await deregisterEvent(event_id);
      console.log(response)
      LoadingToast("Opting out...");
      SuccessToast(response.data.message);
      setIsRegistered(false);
      
     } catch (error) {
      console.log(error)
      ErrorToast(error.message)
      
     }

 
  };

  return (
    <>
      <ToasterContainer />
      <div className="Eventscontainer">
        {(isLoading || isFetching) && <div></div>}
        {isError && <div>Error ocured...</div>}
        {events && events.map((event, index) => (
          <div className="event-card" key={index}>
            <div className="event-image">
              <img src={event.event_poster_url} alt={`Event poster ${index}`} />
            </div>
            <div className="by-date">
              <div className="title-by">
                <h5>{event.event_name}</h5>
                <p>{event.event_description}</p>
              </div>
              <div><p>Date: {event.event_date}</p></div>
            </div>
            <div className="event-footer">
              <div className="img-logo">
                <img src={map} alt="Map icon" />
                <div>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="register">
              
                {isRegistered ? (
                  <button onClick={(e)=>handleOptOut(event,index)}>Opt Out</button>

                ) : (
                  <button  onClick={(e) => handleRegister(event, index)}>Register</button>
                )}
              </div>
              <div className="dots">
                <img src={dots} alt="Options" onClick={() => openUpdate(event)} />
                {isUpdateOpen && selectedEvent &&
                  ReactDOM.createPortal(
                    <UpdateEvent closeUpdate={closeUpdate} event={selectedEvent} />,
                    document.body
                  )
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventsHandler;

