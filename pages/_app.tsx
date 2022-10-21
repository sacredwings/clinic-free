//подключение стилей
import "bootstrap/dist/css/bootstrap.min.css" //стили bootstrap
import "fontawesome-free-v6/css/all.css"
import "../styles/app.sass" //стили приложения

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
