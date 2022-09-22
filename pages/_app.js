import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";

import { AuthContextProvider } from "../context/AuthContext";
import University from "./university/[university]";
import { Router, useRouter } from "next/router";


export default function MyApp({ Component, pageProps }) {


  // define routes
  const router = useRouter();
  const routes = [
    "/",
    "/university/[university]",
  ];

  // check if route is in routes
  const isRoute = routes.includes(router.route);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  );

}

