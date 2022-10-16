import {Text} from '../../../UI/Text';
import style from './List.module.css';
import Post from './Post';
import {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {useBestPosts} from './../../../hooks/useBestPost';
import Preloader from '../../../UI/Preloader';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const [, loading] = useBestPosts();
  const posts = useSelector(state => state.posts.posts);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const isLast = useSelector(state => state.posts.isLast);
  const {page} = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '100px',
    });
    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <ul className={style.list}>
        {loading ? <Text>Загрузка...</Text> : posts.length ? (
          posts.map(({data: postData}) => <Post key={postData.id} postData={postData} />)
        ) : (
          <Text>Вы не авторизованы или Постов не найдено</Text>
        )}
        <li ref={endList} className={style.end}/>
        {!isLast && (loading || posts.length > 0) && <Preloader color='#56af27' size={250} />}
      </ul>
      <Outlet />
    </>
  );
};
