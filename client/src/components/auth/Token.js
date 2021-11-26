import React from 'react';
import { useEffect } from 'react';

import Calender from '../calender/Calender';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { loadEvents } from '../../actions/events';

const Token = ({ setAlert, loadEvents, events }) => {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    const handleClick = async (code) => {
      try {
        const googleUserAuthComplete = JSON.stringify(code);
        const body = { code: googleUserAuthComplete };

        const authToken = localStorage.token;

        await axios.post('/api/events/token', body, {
          headers: {
            'x-auth-token': authToken
          }
        });
        console.log('i ran');
      } catch (error) {
        console.log(error);
      }
    };
    handleClick(code);
  });

  return (
    <Container maxWidth="xl">
      <section className="container">
        <h2 className="large text-primary">Dashboard</h2>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              loadEvents();

              setAlert('Your events are succesfully loaded', 'danger');
            }}
          >
            Fetch Events from google
          </Button>
          <Calender />
        </Stack>
      </section>
    </Container>
  );
};

Token.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  events: state.events.events
});

export default connect(mapStateToProps, { setAlert, loadEvents })(Token);
