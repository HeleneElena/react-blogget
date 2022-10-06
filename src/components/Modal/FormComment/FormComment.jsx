import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useContext, useState} from 'react';
import {authContext} from './../../../context/authContext';
import {CommentContext} from '../../../context/commentContext';
import {useStore} from 'react-redux';

export const FormComment = () => {
  const store = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const {auth} = useContext(authContext);
  const {value, setValue} = useContext(CommentContext);

  const userComment = e => {
    e.preventDefault();
    console.log(value);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return formOpen ? (
        <form className={style.form} onSubmit={userComment}>
          <Text As='h3' size={14} tsize={18}>Имя авторизованного пользователя: {auth.name}</Text>
          <textarea 
            className={style.textarea} 
            value={value}
            onChange={handleChange}
          ></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      ) : (
        <button className={style.btn} onClick={handleFormOpen}>Написать комментарий</button>
      );
};
