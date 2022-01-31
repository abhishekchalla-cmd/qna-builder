import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Editor from "./qna";
import TabsTest from "./tabs";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/qna-editor" component={Editor} />
        <Route path="/tabs" component={TabsTest} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
