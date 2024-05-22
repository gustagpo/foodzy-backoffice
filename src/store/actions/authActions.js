export const setJWT = (jwt, user) => {
  return {
    type: 'SET_JWT',
    payload: {jwt, user}, 
    // se for adicionar o user, payload: { jwt, user }
  };
};

export const clearJWT = () => {
  return {
    type: 'CLEAR_JWT',
  };
};