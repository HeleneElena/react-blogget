import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout} from '../store/auth/action';
import {authRequestAsync} from './../store/auth/action';

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data);
  const token = useSelector(state => state.tokenReducer.token);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const clearAuth = () => dispatch(authLogout());

  return [auth, loading, clearAuth];
};
