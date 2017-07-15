export const FIND_USER = 'FIND_USER';
export const RETRIEVE_PARENT = 'RETRIEVE_PARENT';



export function getParent(starter = null) {
  return {
    type: RETRIEVE_PARENT,
    parent: true, // Placeholder
  };
};
