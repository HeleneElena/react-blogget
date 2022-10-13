import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {commentsRequestAsync} from '../store/comments/commentsAction';


export const useCommentsData = (id) => {
  const token = useSelector(state => state.tokenReducer.token);
  const post = useSelector(state => state.comments.post);
  const comments = useSelector(state => state.comments.comments);
  const status = useSelector(state => state.comments.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsRequestAsync());
  }, [token]);

  return [post, comments, status];
};
