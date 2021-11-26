import {
 
 GET_EVENTS,
 GET_ALL_USERS,
 GET_SINGLE_USER_EVENTS
  } from '../actions/types';
  
  const initialState = {
      events:[],
      users:[],
      singleUserEvents:[]
  };
  
  function eventsReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_EVENTS:
        return {
          ...state,
        
          events: payload
        };

     case GET_ALL_USERS:
         return{
           ...state,
           users:payload
         }
    case GET_SINGLE_USER_EVENTS:
      return{
        ...state,
        
        singleUserEvents:payload
      }
     
     
      default:
        return state;
    }
  }
  
  export default eventsReducer;
  