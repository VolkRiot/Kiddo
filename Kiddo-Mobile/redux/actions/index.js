export const FOUND_PARENT = 'FOUND_PARENT';
export const PARENT_NOT_FOUND = 'PARENT_NOT_FOUND';
export const RESET_SEARCH_BOX = 'RESET_SEARCH_BOX';

export function findParentbyEmail(email = null) {
  // [root]/mobile/find/user/email?term=metrikin@gmail.com
  return (dispatch) => {
    fetch(`http://localhost:3000/mobile/find/user/email?term=${email.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: FOUND_PARENT,
          payload: data,
        });
      })
      .catch((/* error */) => {
        dispatch({
          type: PARENT_NOT_FOUND,
          payload: null,
        });
      });
  };
}

export function resetSearchTerm() {
  return {
    type: RESET_SEARCH_BOX,
    payload: null,
  };
}
