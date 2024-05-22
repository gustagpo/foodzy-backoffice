import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from "redux-thunk";
import { Provider } from 'react-redux';
import authReducer from './reducers/authReducer';

const reducer = combineReducers({
    auth: authReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
    );


export default store;