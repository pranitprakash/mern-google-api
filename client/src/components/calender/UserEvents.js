import React from 'react';
import './main.css';

import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';




const UserEvents = ({ singleUserEvents }) => {
  
  const [clickedDateEvents,setClickedDateEvents] = React.useState([]);
  const [modalVisibility, setmodalVisbility] = React.useState("hidden");
  const [modalCloseVisibilty, setModalCloseVisibilty ]= React.useState("hidden");
 



  

  const hideEvents = () => {
    setmodalVisbility('hidden')
    setModalCloseVisibilty('hidden')

  }


const modalStyle ={
  color:'blueGrey',
  backgroundColor:'#c6e2ff',
  height : 'fit-content',
  blockSize: 'fit-content',
  padding: '50px',
  width : '1000px',
  zIndex:100,
  visibility : modalVisibility,
  display:'flex',
  flexDirection : 'column',
  justifyContent:'center',

};

const modalCloseStyle = {
  visibility : modalCloseVisibilty,
}




  const calendarRef = React.createRef();
  const googleEvents = (start, summary) => {
    let calenderApi = calendarRef.current.getApi();
    calenderApi.addEvent({
     
      id: createEventId(),
      title: summary, 
      start: start 
    
    });
  };

  const handleDateClick = (selectInfo) => {
 
    let calendarApi = selectInfo.view.calendar;
    
    var newArray = singleUserEvents.filter(function (el)
    {   const  newDateAndTime = el.start.split("T");
     const newDate = newDateAndTime[0];
    
      return newDate=== selectInfo.dateStr ;
            
    });

    console.log(newArray);
    setClickedDateEvents(newArray);
    console.log(clickedDateEvents);
    setmodalVisbility('visible');
    setModalCloseVisibilty('visible')

  
  
    calendarApi.unselect(); //
  };



  return (
    <Container maxWidth="xl">
    <button style={modalCloseStyle} className="modalClose" onClick={hideEvents}>X</button>
    <div   style={modalStyle}> {clickedDateEvents.map((event)=>{
      return <div className="modalStylee" > <h1> {event.summary}</h1> </div>
    })} </div>
      <Stack>
        <Button
          variant="contained"
          className="top-button"
          onClick={() =>
            singleUserEvents.forEach((event) => {
              console.log("load singke use")
              googleEvents(event.start, event.summary);
            })
          }
        >
          Display fetched events
        </Button>
       
        <div>
    
    
    </div>
     
        <Container>
          <div className="demo-app-main" >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView="dayGridMonth"
              editable={true}
              ref={calendarRef}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // weekends={this.state.weekendsVisible}

              initialEvents={INITIAL_EVENTS} 
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              
             
            />
          </div>
        </Container>
      </Stack>
    </Container>
  );
};

const handleEventClick = (clickInfo) => {
  if (
    prompt(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
};



function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

UserEvents.propTypes = {
    singleUserEvents: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    singleUserEvents : state.events.singleUserEvents
});

export default connect(mapStateToProps, {})(UserEvents);
