import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
