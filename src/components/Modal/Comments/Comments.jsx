import style from './Comments.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text';
import Time from '../../../components/Main/List/Post/Time';
import formatDate from '../../../utils/formatDate';

export const Comments = ({comments}) => { 
  console.log(comments);
  
  return (<ul className={style.list}>
    {comments.length ? (
      comments.map(({body, author, id, created: date}) => (
        date && 
        <li key={id} className={style.item}>
          <Text As='h3' className={style.author} size={18} tsize={22}>{author}</Text>
          <Text As='p' className={style.comment} size={14} tsize={18}>{body}</Text>
          <Time date={date.length ? formatDate(date) : date} />
        </li>
      ))) : (
        <p>Нет комментариев</p>
      )
    }
  </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
