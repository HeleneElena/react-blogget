import {useState} from 'react';
import ReactDOM from 'react-dom';
import style from './Notregistration.module.css';

export const Notregistration = () => {
  const [show, setShow] = useState(true);

  const hide = () => {
    setShow(false);
  };
  return ReactDOM.createPortal(
    show && <div className={style.notify} onClick={hide}>
      <p>Произошла ошибка авторизации.</p>
    </div>,
    document.getElementById('notify-root')
  );
};
