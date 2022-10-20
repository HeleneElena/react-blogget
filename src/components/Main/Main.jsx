import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes, Navigate} from 'react-router-dom';
import Modal from '../Modal';
import StartPage from '../page/StartPage';
import Page404 from '../page/Page404';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='auth' element={<Navigate to='/' />} />
        <Route path='/category/:page' element={<List />}>
          <Route path='post/:id' element={<Modal />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Layout>
  </main>
);
