import style from './Page404.module.css';
import {Text} from '../../../UI/Text';

export const Page404 = () => (
  <div className={style.wrapper}>
    <Text As='h1' color={'green'} size={24} tsize={26}>Ошибка 404</Text>
    <Text As='p' center size={16} tsize={18}>Запрошенная страница не существует.</Text>
  </div>
);

