export const FIND_USER = 'FIND_USER';
export const FIND_PARENT = 'FIND_PARENT';



export function findParentbyEmail(email = null) {
  // [root]/mobile/find/user/email?term=metrikin@gmail.com
  return (dispatch) => {
    fetch(`/mobile/find/user/email?term=${email}`)
      .then((response) => {
        // (TODO) Add error checking
        dispatch({
          type: FIND_PARENT,
          payload: response
        });
      });
  };
}
