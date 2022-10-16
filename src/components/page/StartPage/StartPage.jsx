import style from './StartPage.module.css';
import {Text} from '../../../UI/Text';

export const StartPage = () => (
  <div className={style.wrapper}>
    <Text As='h1' size={20} tsize={26}>Стартовая страница</Text>
    <Text As='p' medium size={20}>Добро пожаловать!</Text>
    <Text As='p'>Выберите категорию</Text>
  </div>
);
