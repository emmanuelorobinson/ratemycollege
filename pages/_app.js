import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";

import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
