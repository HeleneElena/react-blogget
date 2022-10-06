import Header from './components/Header';
import Main from './components/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {useToken} from './hooks/useToken';
import {TokenContextProvider} from './context/tokenContext';
import {AuthContextProvider} from './context/authContext';
import {CommentContextProvider} from './context/commentContext';

const initialState = {
  comment: 'Hallo',
};

const rootReducer = (state = initialState, action) => state;

const store = createStore(rootReducer);
console.log('store: ', store);

function App() {
  const [token, delToken] = useToken('');

  return (
    <Provider store={store}>
      <TokenContextProvider token={token} delToken={delToken}>
        <AuthContextProvider>
          <CommentContextProvider>
            <Header />
            <Main />
          </CommentContextProvider>
        </AuthContextProvider>
      </TokenContextProvider>
    </Provider>
  );
}

export default App;
