import api from '../utils/api';
import {

  
  EVENTS_FAIL,
  GET_EVENTS,
  GET_ALL_USERS,
  GET_SINGLE_USER_EVENTS
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User


//load events

export const loadEvents = ()=> async (dispatch)=>{
    try {
        const res = await api.get('/events/getMyEvents');
        console.log(res.data);

        dispatch({
            type:GET_EVENTS,
            payload: res.data
        })
        
    } catch (err) {
       

        

        dispatch({
            type:EVENTS_FAIL
        });
    }
};

export const loadAllUsers = ()=> async (dispatch)=>{
    try {
        const res = await api.get('/events/getAllUsers');

        dispatch({
            type:GET_ALL_USERS,
            payload: res.data
        })
        
    } catch (err) {
       

        

        dispatch({
            type:EVENTS_FAIL
        });
    }
};

export const loadSingleUserEvents = (id)=> async (dispatch)=>{
    try {
        const res = await api.get(`/events/getOneUserEvents/${id}`);

        dispatch({
            type:GET_SINGLE_USER_EVENTS,
            payload: res.data
        })
        
    } catch (err) {
       

        

        dispatch({
            type:EVENTS_FAIL
        });
    }
};