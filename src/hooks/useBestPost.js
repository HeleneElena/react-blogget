import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {URL_API} from '../api/const';


export const useBestPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = useSelector(state => state.tokenReducer.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(({data}) => {
        const postsData = data.children;
        setPosts(postsData);
      })
      .catch(err => {
        console.error(err);
      });
  }, [token]);

  return [posts];
};
