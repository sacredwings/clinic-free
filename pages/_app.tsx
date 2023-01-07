import { Provider } from 'react-redux'
import store from '../store'

//подключение стилей
import "bootstrap/dist/css/bootstrap.min.css" //стили bootstrap
import "fontawesome-free-v6/css/all.css"
import "../styles/app.sass" //стили приложения

export default function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
