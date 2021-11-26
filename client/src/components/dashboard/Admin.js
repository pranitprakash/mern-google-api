import React from "react";
import Container from "@mui/material/Container";
import { Navigate } from "react-router";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import { styled } from "@mui/system";
import { loadAllUsers} from '../../actions/events';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import {Link} from 'react-router-dom'

const ButtonContainer = styled("div")({
  color: "darkslategray",

  borderRadius: 4,
  marginTop: 100,
});
const LinkContainer = styled("div")({
    color: "red",
  
 
    backgroundColor:"yellow",
    borderRadius: 4,
    margin:20,
    padding:10
  });
  
export const Admin = ({setAlert,loadAllUsers,users}) => {


  return (
    <div>
      <Container maxWidth="xs">
        <ButtonContainer>
         <h2>
           List of users ,who submitted their upcomming events
        </h2>
          </ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              loadAllUsers();

              setAlert('Your events are loading please wait', 'danger');
            }}
          >
            Click here to get list of events who submitted their google calender events
          </Button>

         {users.map((user)=>{
           return <LinkContainer><Link to={`/getUserEvents/${user._id}`} > {user.name }  </Link></LinkContainer>
           
           
       
         })}


      
     
        
        
      </Container>
    </div>
  );
};
Admin.propTypes = {
    setAlert: PropTypes.func.isRequired,
 
    users: PropTypes.array.isRequired
  };
  
  const mapStateToProps = (state) => ({
    users: state.events.users
  });
  
  export default connect(mapStateToProps, { setAlert, loadAllUsers})(Admin);