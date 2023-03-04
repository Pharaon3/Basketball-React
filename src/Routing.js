import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimationPage from "./pages/AnimationPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function Routing({fullScreenHandle}) {
  const loginFlag = true;
  const [fieldLineFlag, setFieldLineFlag] = useState(true);
  const [fullScreenFlag, setFullScreenFlag] = useState(false);

  const [imgWidth, setImgWidth] = useState();
  const [imgHeight, setImgHeight] = useState();
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);

  const [mousePosX, setMousePosX] = useState(0)
  const [mousePosY, setMousePosY] = useState(0)
  const [newCircles, setNewCircles] = useState([])
  const [newPoints, setNewPoints] = useState([])
  const [newBalls, setNewBalls] = useState([])
  const [positionCircleDiff, setPositionCircleDiff] = useState(18)
  const [positionPointDiff, setPositionPointDiff] = useState(10)
  const [positionBallDiff, setPositionBallDiff] = useState(15)

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainPage
              fieldLineFlag={fieldLineFlag}  setFieldLineFlag={setFieldLineFlag}
              fullScreenFlag={fullScreenFlag} setFullScreenFlag={setFullScreenFlag}
              fullScreenHandle={fullScreenHandle}

              imgWidth={imgWidth} setImgWidth={setImgWidth}
              imgHeight={imgHeight} setImgHeight={setImgHeight}
              windowsWidth={windowsWidth} setWindowsWidth={setWindowsWidth}
              mousePosX={mousePosX} setMousePosX={setMousePosX}
              mousePosY={mousePosY} setMousePosY={setMousePosY}
              newCircles={newCircles} setNewCircles={setNewCircles}
              newPoints={newPoints} setNewPoints={setNewPoints}
              newBalls={newBalls} setNewBalls={setNewBalls}
              positionCircleDiff={positionCircleDiff} setPositionCircleDiff={setPositionCircleDiff}
              positionPointDiff={positionPointDiff} setPositionPointDiff={setPositionPointDiff}
              positionBallDiff={positionBallDiff} setPositionBallDiff={setPositionBallDiff}
            />
          }
        />
        <Route exact path="/login" element={<LoginPage />} />
        {loginFlag &&
          <Route
            exact
            path="/main"
            element={
              <MainPage
                fieldLineFlag={fieldLineFlag}  setFieldLineFlag={setFieldLineFlag}
                fullScreenFlag={fullScreenFlag} setFullScreenFlag={setFullScreenFlag}
                fullScreenHandle={fullScreenHandle}

                imgWidth={imgWidth} setImgWidth={setImgWidth}
                windowsWidth={windowsWidth} setWindowsWidth={setWindowsWidth}
                mousePosX={mousePosX} setMousePosX={setMousePosX}
                mousePosY={mousePosY} setMousePosY={setMousePosY}
                newCircles={newCircles} setNewCircles={setNewCircles}
                newPoints={newPoints} setNewPoints={setNewPoints}
                newBalls={newBalls} setNewBalls={setNewBalls}
                positionCircleDiff={positionCircleDiff} setPositionCircleDiff={setPositionCircleDiff}
                positionPointDiff={positionPointDiff} setPositionPointDiff={setPositionPointDiff}
                positionBallDiff={positionBallDiff} setPositionBallDiff={setPositionBallDiff}
              />
            }
          />}
        {loginFlag &&
          <Route
            exact
            path="/animation"
            element={
              <AnimationPage
                fieldLineFlag={fieldLineFlag}  setFieldLineFlag={setFieldLineFlag}
                fullScreenFlag={fullScreenFlag} setFullScreenFlag={setFullScreenFlag}
                fullScreenHandle={fullScreenHandle}

                imgWidth={imgWidth} setImgWidth={setImgWidth}
                windowsWidth={windowsWidth} setWindowsWidth={setWindowsWidth}
                mousePosX={mousePosX} setMousePosX={setMousePosX}
                mousePosY={mousePosY} setMousePosY={setMousePosY}
                newCircles={newCircles} setNewCircles={setNewCircles}
                newPoints={newPoints} setNewPoints={setNewPoints}
                newBalls={newBalls} setNewBalls={setNewBalls}
                positionCircleDiff={positionCircleDiff} setPositionCircleDiff={setPositionCircleDiff}
                positionPointDiff={positionPointDiff} setPositionPointDiff={setPositionPointDiff}
                positionBallDiff={positionBallDiff} setPositionBallDiff={setPositionBallDiff}
              />
            }
          />}
      </Routes>
    </Router>
  );
}

export default Routing;
