const express = require("express");
const fs = require("fs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");


const { google } = require("googleapis");

const router = express.Router();

//@route            POST api/events
//@description      Test route
//@access           Public

router.post('/token',auth, (req,res)=>{

 const {code } = req.body;
 console.log(code);
 const authCode = JSON.parse(code);
 console.log(authCode) ;
const fetchedEvents = [];
 const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

 const TOKEN_PATH = 'token.json';






// Load client secrets from a local file.
//actual authorization call to fetch the events
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), (oAuth2Client)=>{
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');

      


        //pushing events accociated with the user to the database 
          events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
          
          try {


            const saveEvents = async ()=>{
              const user = await User.findOne({ _id: req.user.id });
              
            const start = event.start.dateTime || event.start.date;
            const summary = event.summary
            const description = JSON.stringify(event.description);
            const newEvent = {start,summary,description}
            
             user.events.push(newEvent);
            await user.save();
          
             
            }
            saveEvents();
         
          } catch (err) {
            console.error(err.message);
            // res.status(500).send('Server Error');
          }
  

        });
      } else {
        console.log('No upcoming events found.');
     //  res.status(200).json({msg:'No upcomming events found'});
      }
    });
  });
});


function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
//getting and storing new token

function getAccessToken(oAuth2Client, callback) {
  // const authUrl = oAuth2Client.generateAuthUrl({
  //   access_type: 'offline',
  //   scope: SCOPES,
  // });
  // console.log(authUrl);
 
 
 
    oAuth2Client.getToken(authCode, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });

    /**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */


 
}



});

//get the events by the user

router.get('/getMyEvents',auth,(req,res)=>{
  try {


    const getEvents = async ()=>{
      const user = await User.findOne({ _id: req.user.id });
      
      return res.status(200).json(user.events)
   
    }
     getEvents();
  
  } catch (err) {
    console.error(err.message);
      return res.status(500).send('Server Error');
  }


});


//get all user 

router.get('/getAllUsers',(req,res)=>{
  try {


    const getAllUsers = async ()=>{
      const user = await User.find({ });
      
      return res.status(200).json(user)
   
    }
     getAllUsers();
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  
})

//get a user by id sent with body 

router.get('/getOneUserEvents/:id',(req,res)=>{
  try {
      const id= req.params.id

    const getOneUserEvents = async ()=>{
      const user = await User.findOne({ _id:id});
      
      return res.status(200).json(user.events)
   
    }
     getOneUserEvents();
  
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }

  
}) 





module.exports = router;
