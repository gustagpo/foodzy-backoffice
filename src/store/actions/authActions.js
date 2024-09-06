export const setJWT = (jwt, user, config) => {
  return {
    type: 'SET_JWT',
    payload: {jwt, user, config}, 
    // se for adicionar o user, payload: { jwt, user }
  };
};

export const clearJWT = () => {
  return {
    type: 'CLEAR_JWT',
  };
};