import axios from 'axios';
import {URL_API} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = data => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  if (!token) return;

  dispatch(postsRequest());
  axios(`${URL_API}/best`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data: {data}}) => {
      const postsData = data.children;
      dispatch(postsRequestSuccess(postsData));
    })
    .catch(error => {
      console.error('Произошла ошибка: ', error);
      dispatch(postsRequestError(error.toString()));
    });
};
