import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout} from '../store/auth/action';
import {authRequestAsync} from './../store/auth/action';

export const useAuth = () => {
  const auth = useSelector(state => state.authReducer.data);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const clearAuth = () => dispatch(authLogout());

  return [auth, clearAuth];
};
