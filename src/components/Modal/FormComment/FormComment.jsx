import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useRef, useContext, useState} from 'react';
import {authContext} from './../../../context/authContext';

export const FormComment = () => {
  const [formOpen, setFormOpen] = useState(false);
  const {auth} = useContext(authContext);
  const textareaRef = useRef(null);

  const userComment = e => {
    e.preventDefault();
    console.log(textareaRef.current.value);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  return formOpen ? (
        <form className={style.form} onSubmit={userComment}>
          <Text As='h3' size={14} tsize={18}>Имя авторизованного пользователя: {auth.name}</Text>
          <textarea className={style.textarea} ref={textareaRef}></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      ) : (
        <button className={style.btn} onClick={handleFormOpen}>Написать комментарий</button>
      );
};
