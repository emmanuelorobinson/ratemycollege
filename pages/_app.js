import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";

import { AuthContextProvider } from "../context/AuthContext";


export default function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  );

}

