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
  const calendarRef = React.createRef();
  const googleEvents = (start, summary) => {
    let calenderApi = calendarRef.current.getApi();
    calenderApi.addEvent({
      // this object will be "parsed" into an Event Object
      id: createEventId(),
      title: summary, // a property!
      start: start // a property!
      // a property! ** see important note below about 'end' **
    });
  };

  return (
    <Container maxWidth="xl">
      <Stack>
        <Button
          variant="contained"
          className="top-button"
          onClick={() =>
            singleUserEvents.forEach((event) => {
              googleEvents(event.start, event.summary);
            })
          }
        >
          Display fetched events
        </Button>
        <Container>
          <div className="demo-app-main">
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

const handleDateClick = (selectInfo) => {
 
  let calendarApi = selectInfo.view.calendar;
  console.log(selectInfo.dateStr);
  calendarApi.unselect(); //
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
