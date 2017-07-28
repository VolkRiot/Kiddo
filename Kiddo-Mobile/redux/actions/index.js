import { AsyncStorage } from 'react-native';
import { Location, Permissions } from 'expo';

export const FOUND_PARENT = 'FOUND_PARENT';
export const PARENT_NOT_FOUND = 'PARENT_NOT_FOUND';
export const RESET_SEARCH_BOX = 'RESET_SEARCH_BOX';

export const SAVE_KID_USER = 'SAVE_KID_USER';
export const IS_USER_REGISTERED = 'IS_USER_REGISTERED';
export const SET_LOCATION = 'SET_LOCATION';

// Debugging purposes
const baseURL =
  'https://appkiddo-staging.herokuapp.com' || 'http://localhost:3000';

export function getStoredUser() {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('KID_USER');

      if (value !== null) {
        // We have data!!
        // console.log('Value gotten from storage', value);
        dispatch({
          type: SAVE_KID_USER,
          payload: JSON.parse(value)
        });
        return true;
      }
    } catch (error) {
      // TODO: What should happen here, default for kid is already null
      dispatch({
        type: SAVE_KID_USER,
        payload: null
      });
      return false;
    }
  };
}

export function findParentbyEmail(email = null) {
  // [root]/mobile/find/user/email?term=metrikin@gmail.com
  return dispatch => {
    fetch(`${baseURL}/mobile/find/user/email?term=${email.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FOUND_PARENT,
          payload: data
        });
      })
      .catch(
        (/* error */) => {
          dispatch({
            type: PARENT_NOT_FOUND,
            payload: null
          });
        }
      );
  };
}

export function resetSearchTerm() {
  return {
    type: RESET_SEARCH_BOX,
    payload: null
  };
}

export function updateKid(kid) {
  return dispatch => {
    dispatch(saveKidAsUser(kid));
  };
}

export function saveKidAsUser({ _id }) {
  // TODO( Need error handler later)

  return dispatch => {
    fetch(`${baseURL}/api/kid?_id=${_id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        const kid = data.body;
        AsyncStorage.setItem('KID_USER', JSON.stringify(kid));

        dispatch({
          type: SAVE_KID_USER,
          payload: kid
        });

        return true;
      })
      .catch(() => {
        // TODO: Expand to handle this case. Make strategy
        // eslint-disable-next-line no-console
        console.log('Failed to find kid');
        return false;
      });
  };
}

export function getLocation() {
  return async dispatch => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      // TODO: Something handle not getting permission
    } else {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(location.coords));
    }
  };
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location
  };
}
