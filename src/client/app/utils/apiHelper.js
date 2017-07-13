import axios from 'axios'

const ApiHelper = () => {
  const api = axios;
  const userRoute = '/auth/currentuser'
  const isAuthRoute = '/auth/authenticate'
  const addKiddoRoute = '/api/kid?method=create'
  const addEventRoute = '/api/event?method=create'

  return {
    getCurrentUser: () => {
      return api.get(userRoute)
    },
    isUserAuthenticated: () => {
      return api.get(isAuthRoute)
    },
    addKiddo: (kiddo) => {
       return api.post(addKiddoRoute, kiddo)
    },
    addEvent: (event) => {
      return api.post(addEventRoute, event)
    }
  }
};

export default ApiHelper;
