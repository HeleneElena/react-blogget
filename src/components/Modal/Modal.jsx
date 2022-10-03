import style from './Modal.module.css';
import {ReactComponent as CloseSvg} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useRef, useEffect, useCallback} from 'react';
import {FormComment} from './FormComment/FormComment';
import {useCommentsData} from './../../hooks/useCommentsData';
import {Comments} from './Comments/Comments';

export const Modal = ({id, closeModal}) => {
  const overlayRef = useRef(null);
  const [commentsDaten] = useCommentsData(id);
  const [post, comments] = commentsDaten;

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const escFunction = useCallback(e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return ReactDOM.createPortal( 
    <div className={style.overlay} ref={overlayRef} >
      <div className={style.modal}>
        {
          post ? (
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
                  {post}
                </Markdown>
              </div>
              <p className={style.author}>{post.author}</p>
              <button className={style.close} onClick={closeModal}>
                <CloseSvg />
              </button>
              <FormComment />
              <Comments comments={comments} />
            </>
          ) : (
            <p className={style.load}>Загрузка...</p>
          )
        }
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};
  
Modal.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};

