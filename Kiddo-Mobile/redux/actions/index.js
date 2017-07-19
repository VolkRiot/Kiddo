export const FOUND_PARENT = 'FOUND_PARENT';

export function findParentbyEmail(email = null) {
  // [root]/mobile/find/user/email?term=metrikin@gmail.com
  return (dispatch) => {
    fetch(`http://localhost:3000/mobile/find/user/email?term=${email.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // console.log('fetch - did receive response: ', JSON.stringify(response));
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: FOUND_PARENT,
          payload: data
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}
