import "./App.scss";
import React  from 'react';
import Routing from "./Routing";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const fullScreenHandle = useFullScreenHandle()
  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="App">
        <Routing fullScreenHandle={fullScreenHandle}/>
      </div>
    </FullScreen>
  );
}

export default App;
