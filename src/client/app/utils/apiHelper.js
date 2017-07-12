import axios from 'axios'

const ApiHelper = () => {
  const api = axios;
  const userRoute = '/auth/currentuser'
  const isAuthRoute = '/authenticate'

  return {
    getCurrentUser: () => {
      return api.get(userRoute)
    },
    isUserAuthenticated: () => {
      return api.get(isAuthRoute)
    }
  }
}

export default ApiHelper;
