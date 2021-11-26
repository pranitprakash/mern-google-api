import React from 'react';

import { useParams } from 'react-router';

import UserEvents from '../calender/UserEvents';

import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import { loadSingleUserEvents } from '../../actions/events';
;

const GetUserEvents = ({ setAlert, loadSingleUserEvents, singleUserEvents }) => {

   const {id} = useParams();
 

   

 
 
  return (
    <Container maxWidth="xl">
      <section className="container">
        <h2 className="large text-primary">Dashboard</h2>

        <Stack spacing={2}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                loadSingleUserEvents(id);

              setAlert('Your events are succesfully loaded', 'danger');
            }}
          >
            Fetch Events from google
          </Button>
          <UserEvents />
        </Stack>
      </section>
    </Container>
  );
};

GetUserEvents.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loadSingleUserEvents: PropTypes.func.isRequired,
  singleUserEvents: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
 singleUserEvents : state.events.singleUserEvents
});

export default connect(mapStateToProps, { setAlert, loadSingleUserEvents })(GetUserEvents);
