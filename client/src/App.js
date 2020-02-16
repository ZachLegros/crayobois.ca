import React, { useEffect } from "react";
import NavState from "./components/context/navState";
import GlobalState from "./components/context/GlobalState";
import AuthState from "./components/context/AuthState";
import RouterComponent from "./Router";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <React.Fragment>
      <GlobalState>
        <AuthState>
          <NavState>
            <RouterComponent />
          </NavState>
        </AuthState>
      </GlobalState>
    </React.Fragment>
  );
};

export default App;
