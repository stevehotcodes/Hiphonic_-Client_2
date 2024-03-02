
import map from "../../assets/40px.png"
import bigvideo1 from "../../assets/bigvideo1.png";
import "./EventsHandler.scss";
import { useGetAllEventsQuery } from "../../features/Events/EventsSlice";
import UpdateEvent from "../../features/Events/updateEvents";
import { SuccessToast, ToasterContainer, LoadingToast, ErrorToast } from "../Toaster/Toaster";
import dots from '../../assets/dots.png'
import { useState } from "react";
import ReactDOM from 'react-dom';


const EventsHandler = () => {
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const openUpdate = () => {
    !setUpdateOpen(true)
  };
  const closeUpdate = () => {
    setUpdateOpen(false)
  }
  const { data: events, isLoading, isFetching, isError } = useGetAllEventsQuery()
  console.log(`Events: ${events}, isLoding:${isLoading},isFetching${isFetching}`)


  return (
    <><ToasterContainer />
      <div className="Eventscontainer">
        {(isLoading || isFetching) && <div>Loading...</div>}
        {(isError) && <div>oooh noo an error occured..</div>}
        {console.log(events)}
        {events && events.map((event, index) => (
          <div className="event-card" key={index}>
            <div className="event-image">
              <img src={bigvideo1} alt={`Event icon ${index}`} />
            </div>
            <div className="by-date">
              <div className="title-by">
                <h5>{event.event_name}</h5>
                <p> {event.event_description}</p>
              </div>

              <div>  <p>Date: {event.event_date}</p></div>
            </div>
            <div className="sk-txt">

            </div>
            <div className="event-footer">
              <div className="img-logo">
                <img src={map} alt="Map icon" />
                <div>

                  <p>{event.location}</p>
                </div>
              </div>
              <button>register</button>
              <div className="dots">
                <img src={dots} alt="nopic" onClick={openUpdate} />
                {isUpdateOpen &&
                  ReactDOM.createPortal(
                    <UpdateEvent closeUpdate={closeUpdate} event={event}/>,
                    document.body
                  )
                }
              </div>
            </div>
          </div>
        ))}
      </div></>
  );
};

export default EventsHandler;
