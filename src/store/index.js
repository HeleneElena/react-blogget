import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer, tokenMiddleware} from './tokenReducer';
import {commentReducer} from './commentReducer';
import thunk from 'redux-thunk';
import {authReducer} from './auth/authReducer';

const rootReducer = combineReducers({
  tokenReducer,
  commentReducer,
  authReducer,
});

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(tokenMiddleware, thunk)),
);

