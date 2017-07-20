import axios from 'axios';

const ApiHelper = () => {
  const api = axios;
  const userRoute = '/auth/currentuser';
  const isAuthRoute = '/auth/authenticate';
  const addKiddoRoute = '/api/kid?method=create';
  const addEventRoute = '/api/event?method=create';
  const addCalendarRoute = '/kid/addcalendar';
  const retrieveCalEvents = '/calendar/getevents';

  return {
    getCurrentUser: () => {
      return api.get(userRoute);
    },
    isUserAuthenticated: () => {
      return api.get(isAuthRoute);
    },
    addKiddo: kiddo => {
      return api.post(addKiddoRoute, kiddo);
    },
    addEvent: event => {
      return api.post(addEventRoute, event);
    },
    addCalendar: kidName => {
      return api.post(addCalendarRoute, kidName);
    }, 
    eventsSnapshot: () => {
      return api.get(retrieveCalEvents);
    }
  };
};

export default ApiHelper;
