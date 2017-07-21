import axios from 'axios';

const ApiHelper = () => {
  const api = axios;
  const userRoute = '/auth/currentuser';
  const isAuthRoute = '/auth/authenticate';
  const addKiddoRoute = '/api/kid?method=create';
  const addEventRoute = '/api/event?method=create';
  const addCalendarRoute = '/kid/addcalendar';
  const retrieveCalEvents = '/calendar/getevents';

  const putKidRoute = id => `/api/kid?method=update&_id=${id}`;

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
    },
    updateKiddo: kiddo => {
      return api.put(putKidRoute(kiddo._id), kiddo);
    }
  };
};

export default ApiHelper;
