# FULL STACK APP BUILT WITH MERN

## FUNCTIONALITY

##  Fetch events from google calender api and display them on the app , in a event calender.

### There are two types of users on this app Guest User and Admin user.

 
#### TO USE THE APP AS ADMIN USER USE THE BELOW CREDENTIALS AND USERNAME AND AND PASSWORD, SO THAT YOU CAN ACCESS THE ADMIN PANEL


##  ADMIN USERNAME: admin@techvariable.com
## ADMIN PASSWORD :  12345678


######   Features of this app:  ########
#####  Normal user story ###########
Create an user account:
Login to user dashboard with the credentials.
Redirect to dashboard, where option to login with google to get access to google api, this works using thengoogle o auth2 client
google calender api.
After authorization succesfull
User redirected to the events view , which shows a calender and two buttons to fetch events from the calender api and 
display them on the calender.
then the user can click on any date that has events to display all the events for the particular date in a modal box.
user can delete events bny clicking on them.

#####  Admin user story ###########
Login to  admin user dashboard with the credentials.provided in the README file at the top:
###  Redirect to dashboard, where option to login with google to get access to google api, this works using thengoogle o auth2 client
  google calender api.

### ON THE DASHBOARD AN ADMIN PANEL LINK APPEARS , WHEN LOGGED IN AS AND ADMIN USER
### ADMIN PANEL-- FIREST VIEW SHOWS A LIST OF ALL  THE USERS WHO HAVE CREATED AN ACCOUNT BY CLICKING THE LOAD USERS NUTTONS ON THE PAGE
### AFTER USERS ARE LOADED CLICK ON ANY OF THEM TO SEE THEIR EVENTS DISPLAYED IN A CALENDER VIEW


# Quick Start 


### Install server dependencies


npm install


### Install client dependencies


cd client
npm install


### Run both Express & React from root


npm run dev


### Build for production


cd client
npm run build



Check in browser on [http://localhost:3000/]==> Frontend
(http://localhost:5000/)===>Backend




### Author

Pranit Prakash Sahu


### License

This project is licensed under the MIT License
