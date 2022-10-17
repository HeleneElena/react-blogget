import style from './Modal.module.css';
import {ReactComponent as CloseSvg} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useRef, useEffect} from 'react';
import {FormComment} from './FormComment/FormComment';
import {useCommentsData} from './../../hooks/useCommentsData';
import {Comments} from './Comments/Comments';
import Preloader from '../../UI/Preloader';
import {Text} from '../../UI/Text';
import {useParams, useNavigate} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const [post, comments, status] = useCommentsData(id);

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  useEffect(() => {
    const escFunction = e => {
      if (e.key === 'Escape') {
        navigate(`/category/${page}`);
      }
    };
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);
    
  useEffect(() => {
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ReactDOM.createPortal( 
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (
          <Preloader color={'#333dcc'} size={150} />
        )}
        {status === 'error' && (
          <Text As="p" medium dsize={18}>
            Произошла ошибка загрузки поста.
          </Text>
        )}
        {status === 'loaded' && (
          <> 
            <h2 className={style.title}>{post.title}</h2>
            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>
                {post.selftext}
              </Markdown>
            </div>
            <p className={style.author}>{post.author}</p>
            <FormComment author={post.author} />
            <Comments comments={comments} />
          </>
        )}
        <button className={style.close} onClick={navigate(`/category/${page}`)}>
          <CloseSvg />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};


