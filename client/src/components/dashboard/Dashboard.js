

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ifUserIsAdmin = (isAdmin)=>{
   if(isAdmin){
     return <p> You are an admin</p>
   } else {
    return <p>You are not and Admin</p>
   }
}
const buttonStyle = {
  color:'blueGrey',
  backgroundColor:'#c6e2ff',
  height : 'fit-content',
  blockSize: 'fit-content',
  padding: '10px',
  width : '50px',
 
}

const Dashboard = ({
  
 
  auth: { user ,isAdmin},
 
}) => {
 
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      <p className="lead">
        { ifUserIsAdmin(isAdmin)
         
        }
      </p>

      <h2> To fetch your events from google calendar click the link below to sign in with google </h2>  
      <a  style={buttonStyle}  href="
 https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=30523846694-uddteq3sgk6kd8vg477kc65vop71khau.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftoken">Authorize google</a>
    </section>
  );
};

Dashboard.propTypes = {

  auth: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,

});

export default connect(mapStateToProps, { })(
  Dashboard
);
