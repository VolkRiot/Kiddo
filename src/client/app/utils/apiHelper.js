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


/*
  Examples of Body Request for each helper function

  addKiddo:
       {
        firstName: 'Theo',
        lastName: 'Martins',
         userName: 'Bigodoro',
         password: 'asdf',
         user_id: '5965cf48ee59d3754830318c'
       }
  addEvent:
       {
         kid_id:'5964c0f69ef70c5f14b13e3b',
         user_id:'5965cf48ee59d3754830318c',
         title:'park',
         calendarName:'test',
         email:'flavio@gmail.com'
       }
*/