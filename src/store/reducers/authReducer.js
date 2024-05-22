const initialState = {
    jwt: null,
    isAuthenticated: false,
    user: null,
    // Outros campos de estado relacionados à autenticação

  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_JWT':
        return {
          ...state,
          jwt: action.payload.jwt,
          isAuthenticated: true,
          user: action.payload.user
        };
      case 'CLEAR_JWT':
        return {
          ...state,
          jwt: null,
          isAuthenticated: false,
          user: null
        };
        
      // case 'GET_JWT':
      //   return {
      //     ...state,
      //     jwt: state,
      //   };

      // removido pois, provalvemente é uma ação a mais do que necessario.
      default:
        return state;
    }
  };
  
  export default authReducer;  