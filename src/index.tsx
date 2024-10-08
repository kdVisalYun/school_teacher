import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "i18n";
import "./index.css";
import store from "store";
import App from "components/App";
import { injectStore } from "config/axiosInstance";
injectStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
