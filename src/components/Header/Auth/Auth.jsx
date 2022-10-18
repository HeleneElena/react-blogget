import {useState} from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {Text} from '../../../UI/Text';

import {urlAuth} from '../../../api/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from './../../../hooks/useAuth';
import {deleteToken} from '../../../store/tokenReducer';
import Preloader from '../../../UI/Preloader';

export const Auth = () => {
  const [auth, loading, clearAuth] = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  
  const dispatch = useDispatch();

  const getOut = () => {
    setShowLogout(!showLogout);
  };

  const logout = () => {
    dispatch(deleteToken(token));
    clearAuth();
    location.href = '/';
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Preloader />
      ) : auth.name ? (
        <>
          <button className={style.btn} onClick={getOut}>
            <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} className={style.img} />
          </button>
          {logout && (
            <button className={style.logout} onClick={logout}>
              Выйти
            </button>
          )}
        </>
      ) : (
        <Text As="a" href={urlAuth} className={style.authLink}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
