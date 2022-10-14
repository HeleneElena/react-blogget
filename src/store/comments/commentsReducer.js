import {COMMENTS_REQUEST, COMMENTS_REQUEST_ERROR, COMMENTS_REQUEST_SUCCESS} from './commentsAction';

const initialState = {
  error: '',
  status: '',
  data: {},
  post: {},
  comments: {},
};


export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: '',
      };
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: action.data,
        post: action.data[0],
        comments: action.data[1],
        error: '',
      };
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };

    default:
      return state;
  }
};
