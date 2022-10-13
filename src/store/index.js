import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer, tokenMiddleware} from './tokenReducer';
import {commentReducer} from './commentReducer';
import thunk from 'redux-thunk';
import {authReducer} from './auth/authReducer';
import {postsReducer} from './posts/postsReducer';
import {commentsReducer} from './comments/commentsReducer';

const rootReducer = combineReducers({
  tokenReducer,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  commentReducer,
});

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(tokenMiddleware, thunk)),
);

