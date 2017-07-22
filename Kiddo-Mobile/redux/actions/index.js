import { AsyncStorage } from 'react-native';

export const FOUND_PARENT = 'FOUND_PARENT';
export const PARENT_NOT_FOUND = 'PARENT_NOT_FOUND';
export const RESET_SEARCH_BOX = 'RESET_SEARCH_BOX';

export const SAVE_KID_USER = 'SAVE_KID_USER';

export function findParentbyEmail(email = null) {
  // [root]/mobile/find/user/email?term=metrikin@gmail.com
  return dispatch => {
    fetch(
      `https://appkiddo-staging.herokuapp.com/mobile/find/user/email?term=${email.toLowerCase()}`
    )
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

export function saveKidAsUser(kid) {
  // TODO( Need error handler later)
  return (dispatch) => {
    
      AsyncStorage.setItem(
        'KID_USER',
        JSON.stringify(kid)
      );

      dispatch({
        type: SAVE_KID_USER,
        payload: kid
      });
  };
}

// AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
//   const settings = JSON.parse(settingsStr)
// })
