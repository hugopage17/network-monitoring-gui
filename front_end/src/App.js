import { store } from './redux'
import { Provider } from 'react-redux'
import Main from './Main'


function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}

export default App;
