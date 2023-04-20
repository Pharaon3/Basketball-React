import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import fieldLine from "../assets/field-line-with-logo.png";
import fieldWithoutLine from "../assets/field-without-line.png";
// import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow-left.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
// import { ReactComponent as CameraIcon } from "../assets/svg/camera.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
// import { ReactComponent as BookmarkIcon } from "../assets/svg/bookmark.svg";
import { ReactComponent as FieldIcon } from "../assets/svg/field.svg";
import { ReactComponent as MinimizeIcon } from "../assets/svg/minimize.svg";
import { ReactComponent as MaximizeIcon } from "../assets/svg/maximize.svg";
import { ReactComponent as VideoIcon } from "../assets/svg/video.svg";
// import { ReactComponent as UsersIcon } from "../assets/svg/users.svg";

import { ReactComponent as GlobeIcon } from "../assets/svg/globe.svg";
import { ReactComponent as HelpCircleIcon } from "../assets/svg/help-circle.svg";
import { ReactComponent as LogInIcon } from "../assets/svg/log-in.svg";

// import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
// import { ReactComponent as PlayCircleIcon } from "../assets/svg/play-circle.svg";
// import { ReactComponent as PauseIcon } from "../assets/svg/pause.svg";
// import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
// import { ReactComponent as RepeatIcon } from "../assets/svg/repeat.svg";

import { ReactComponent as BallIcon } from "../assets/svg/basketball.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as RotateIcon } from "../assets/svg/rotate-ccw.svg";
import { ReactComponent as UserIcon } from "../assets/svg/user.svg";

import { ReactComponent as PencilIcon } from "../assets/svg/pencil.svg";
import { ReactComponent as ArrowIcon } from "../assets/svg/arrows.svg";
import { ReactComponent as CursorIcon } from "../assets/svg/mouse-pointer.svg";
import { ReactComponent as PointerIcon } from "../assets/svg/x.svg";
import { ReactComponent as CircleIcon } from "../assets/svg/circle.svg";
import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
import { ReactComponent as TypeIcon } from "../assets/svg/type.svg";

import mainLogo from "../assets/logo.png";
import html2canvas from "html2canvas";
import SceneWithDrawables from "../components/SceneWithDrawables";
import Tooltip from "@mui/material/Tooltip";
var onceFlag = true;

function MainPage({
  fieldLineFlag,
  setFieldLineFlag,
  fullScreenFlag,
  setFullScreenFlag,
  fullScreenHandle,
  imgWidth,
  setImgWidth,
  imgHeight,
  setImgHeight,
  windowsWidth,
  setWindowsWidth,
  mousePosX,
  setMousePosX,
  mousePosY,
  setMousePosY,
  frame,
  setFrame,
  eachFrameCircle,
  setEachFrameCircle,
  circleId,
  setCircleId,
  currentNumbers,
  setCurrentNumbers,
  newCircles,
  setNewCircles,
  newPoints,
  setNewPoints,
  newBalls,
  setNewBalls,
}) {
  const navigate = useNavigate();
  const [dragCircleItem, setDragCircleItem] = useState(-2);
  const [dragPointItem, setDragPointItem] = useState(-2);
  const [dragBallItem, setDragBallItem] = useState(-2);
  const [dropMenuItem, setDropMenuItem] = useState(-1);
  const [rosterShowFlag, setRosterShowFlag] = useState(false);
  const [positionDiff, setPositionDiff] = useState({circle: 18, point: 10, ball: 12.5});
  const colorArray = [
    "red",
    "blue",
    "brown",
    "yellow",
    "green",
    "white",
    "grey",
    "black",
  ];
  const [drawToolMenuFlag, setDrawToolMenuFlag] = useState(false);
  const [drawTool, setDrawTool] = useState(0);
  const [drawables, setDrawables] = useState([]);

  useEffect(() => {
    if (!document.mozFullScreen && !document.webkitIsFullScreen)
      setFullScreenFlag(false);
    else setFullScreenFlag(true);
  });
  useEffect(() => {
    if (!onceFlag) return;
    onceFlag = false;
    const interval = setInterval(() => {
      const tempInnerWidth = window.innerWidth;
      setWindowsWidth(tempInnerWidth);
      setImgWidth(
        document?.getElementById("image-to-download")?.getBoundingClientRect()
          ?.width
      );
      setImgHeight(
        document?.getElementById("image-to-download")?.getBoundingClientRect()
          ?.height
      );
      if (tempInnerWidth > 1170) {
        setPositionDiff({ circle: 18, point: 10, ball: 12.5 });
      } else if (tempInnerWidth > 480) {
        setPositionDiff({ circle: 13, point: 7, ball: 10 });
      } else {
        setPositionDiff({ circle: 9, point: 6, ball: 8 });
      }
      return () => clearInterval(interval);
    }, 50);
  }, [
    windowsWidth,
    setWindowsWidth,
    setImgWidth,
    setImgHeight,
    setPositionDiff,
  ]);
  const exportAsImage = async (element, imageFileName, downloadFlag) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    if (downloadFlag) downloadImage(image, imageFileName);
    return image;
  };
  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
  const setPositionByMouse = (e) => {
    var bounds = document
      .getElementById("image-to-download")
      .getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    setMousePosX(x);
    setMousePosY(y);
  };
  const setPositionByTouch = (e) => {
    var bounds = document
      .getElementById("image-to-download")
      .getBoundingClientRect();
    var x = e.changedTouches[0].clientX - bounds.left;
    var y = e.changedTouches[0].clientY - bounds.top;
    setMousePosX(x + 1);
    setMousePosY(y + 1);
  };
  /////////////////////////////////////////////////////////////////////////////////
  const itemPicked = (itemType, creatingFlag, index, color) => {
    if (dropMenuItem > -1) return;
    setDragCircleItem(index);
    setDropMenuItem(-1);
    let newEachFrameCircle = eachFrameCircle;
    if (creatingFlag) {
      var tempCurrentId = colorArray.indexOf(color);
      const newObject = {
        id: circleId,
        type: itemType,
        color: color,
        number: currentNumbers[tempCurrentId],
        name: "",
        mousePosX: mousePosX,
        mousePosY: mousePosY,
        imgWidth: imgWidth,
        middleX1: 0,
        middleY1: 0,
        middleX2: 0,
        middleY2: 0,
        isMiddle: false,
      };
      setCircleId(circleId + 1);
      newEachFrameCircle.push(newObject);
      setEachFrameCircle(newEachFrameCircle);
      const nextNewCircles = newCircles.map((item, index) => {
        if (index === 0) {
          return newEachFrameCircle;
        } else if (index > 0) {
          return [...item, newObject];
        } else {
          return item;
        }
      });
      setNewCircles(nextNewCircles);
      if (nextNewCircles.length === 0) {
        setNewCircles(newEachFrameCircle);
      }
      const nextCurrentNumbers = currentNumbers.map((item, index) => {
        if (index !== tempCurrentId) return item;
        else return item + 1;
      });
      if (itemType === "circle") setCurrentNumbers(nextCurrentNumbers);
    }
    console.log("newCircle in itemPicked", newCircles);
    console.log("eachFrameCircle in itemPicked", eachFrameCircle);
  };
  const itemReleased = () => {
    if (dragCircleItem === -2) return;
    const releasingId =
      dragCircleItem > -1 ? dragCircleItem : eachFrameCircle?.length - 1;
    const nexteachFrameCircle = eachFrameCircle?.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          imgWidth: imgWidth,
        };
      } else return item;
    });
    setEachFrameCircle(nexteachFrameCircle);
    const nextNewCircles = newCircles.map((item, index) => {
      if (index === 0) {
        return nexteachFrameCircle;
      } else {
        return item;
      }
    });
    setNewCircles(nextNewCircles);
    setDragCircleItem(-2);
    console.log("eachFrameCircle", eachFrameCircle);
  };
  useEffect(() => {
    // if(frame === 0){
    //   setEachFrameCircle(newCircles)
    // } else {
    console.log("initial newCircles", newCircles);
    if (newCircles.length) setEachFrameCircle(newCircles[0]);
    console.log("eachFrameCircle", eachFrameCircle);
    // }
  }, []);

  return (
    <div id="main" className="MainPage">
      <div className="main">
        <div
          className="board"
          onClick={() => {
            if (rosterShowFlag) setRosterShowFlag(false);
          }}
          onMouseUp={() => {
            itemReleased();
            setDrawToolMenuFlag(false);
          }}
          onTouchEnd={() => {
            itemReleased();
            setDrawToolMenuFlag(false);
          }}
          onMouseLeave={() => {
            itemReleased();
          }}
          onMouseMove={(e) => setPositionByMouse(e)}
          onTouchMove={(e) => setPositionByTouch(e)}
          onTouchStart={(e) => setPositionByTouch(e)}
        >
          <div className="button-line">
            <div className="button-group">
              <div
                className="button"
                onClick={() => setRosterShowFlag(!rosterShowFlag)}
              >
                <Tooltip title="Menu">
                  <MenuIcon />
                </Tooltip>
              </div>
              <div className="button">
                <Tooltip title="Get link">
                  <LinkIcon />
                </Tooltip>
              </div>
              <div
                className="button"
                onClick={() =>
                  exportAsImage(
                    document.getElementById("image-to-download"),
                    "basketball-screen",
                    true
                  )
                }
              >
                <Tooltip title="Donwload">
                  <DownloadIcon />
                </Tooltip>
              </div>
              <div
                className={fieldLineFlag ? "button" : "button clicked"}
                onClick={() => {
                  setFieldLineFlag(!fieldLineFlag);
                }}
              >
                <Tooltip title="Show field">
                  <FieldIcon />
                </Tooltip>
              </div>
              <div
                className={!fullScreenFlag ? "button" : "button clicked"}
                onClick={() => {
                  if (fullScreenFlag) fullScreenHandle.exit();
                  else fullScreenHandle.enter();
                  setFullScreenFlag(!fullScreenFlag);
                }}
              >
                {!fullScreenFlag ? (
                  <Tooltip title="Full screen">
                    <MaximizeIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Exit full screen">
                    <MinimizeIcon />
                  </Tooltip>
                )}
              </div>
              <div
                className="button"
                onClick={() => navigate("/animation/blank")}
              >
                <Tooltip title="Go to animation page">
                  <VideoIcon style={{ color: "red", stroke: "red" }} />
                </Tooltip>
              </div>
            </div>
            <div className="button-group">
              <div className="button">
                <Tooltip title="Global">
                  <GlobeIcon />
                </Tooltip>
              </div>
              <div className="button">
                <Tooltip title="Help">
                  <HelpCircleIcon />
                </Tooltip>
              </div>
              <div className="button">
                <Tooltip title="Log in">
                  <LogInIcon />
                </Tooltip>
              </div>
            </div>
          </div>
          <div id="image-to-download" className="image-to-download">
            <img
              src={fieldLineFlag ? fieldLine : fieldWithoutLine}
              alt="BACKGROUND"
            />
            <div
              id="new-circles"
              style={drawTool !== 0 ? { pointerEvents: "none" } : {}}
            >
              {eachFrameCircle?.map((item, index) => {
                const defaultStyle = {
                  top: `${
                    item?.mousePosY * (imgWidth / item?.imgWidth) -
                    positionDiff[item.type]
                  }px`,
                  left: `${
                    item?.mousePosX * (imgWidth / item?.imgWidth) -
                    positionDiff[item.type]
                  }px`,
                };
                const dragStyle = {
                  top: `${mousePosY - positionDiff[item.type]}px`,
                  left: `${mousePosX - positionDiff[item.type]}px`,
                };
                var contextFlag = false;
                return (
                  <div
                    className={item?.type + " " + item?.color}
                    key={"new-" + item.type + "-" + index}
                    style={
                      dragCircleItem === index ||
                      (dragCircleItem === -1 &&
                        index === eachFrameCircle?.length - 1)
                        ? dragStyle
                        : defaultStyle
                    }
                    // style={defaultStyle}
                    onMouseDown={(e) => {
                      if (e.button === 2) return;
                      itemPicked(item.type, false, index, "");
                    }}
                    onTouchStart={() => {
                      if (contextFlag) return;
                      itemPicked(item.type, false, index, "");
                    }}
                    onContextMenu={(e) => {
                      contextFlag = true;
                      e.preventDefault();
                      setDropMenuItem(index);
                    }}
                    onMouseLeave={() => {
                      setDropMenuItem(-1);
                    }}
                    onTouchEnd={() => {
                      contextFlag = false;
                    }}
                  >
                    {item.type === "circle" ? (
                      <>
                        {item?.number}
                        <div
                          className={
                            dropMenuItem === index ? "drop-menu" : "hidden"
                          }
                        >
                          <p>
                            Number{" "}
                            <input
                              min={1}
                              type="number"
                              value={item?.number}
                              onChange={(e) => {
                                const nexteachFrameCircle =
                                  eachFrameCircle?.map((itemM, indexX) => {
                                    if (indexX === index) {
                                      return {
                                        ...itemM,
                                        number: e.target.value,
                                      };
                                    } else return itemM;
                                  });
                                setEachFrameCircle(nexteachFrameCircle);
                              }}
                            />
                          </p>
                          <p>
                            Name{" "}
                            <input
                              value={item?.name}
                              onChange={(e) => {
                                const nexteachFrameCircle =
                                  eachFrameCircle?.map((itemM, indexX) => {
                                    if (indexX === index) {
                                      return {
                                        ...itemM,
                                        name: e.target.value,
                                      };
                                    } else return itemM;
                                  });
                                setEachFrameCircle(nexteachFrameCircle);
                              }}
                            />
                          </p>
                          <div
                            className="delete-button"
                            onClick={() => {
                              setDropMenuItem(-1);
                              setEachFrameCircle([
                                ...eachFrameCircle?.slice(0, index),
                                ...eachFrameCircle?.slice(index + 1),
                              ]);
                            }}
                            onTouchStart={() => {
                              setDropMenuItem(-1);
                              setEachFrameCircle([
                                ...eachFrameCircle?.slice(0, index),
                                ...eachFrameCircle?.slice(index + 1),
                              ]);
                            }}
                          >
                            Delete
                          </div>
                        </div>
                        <div className="name">{item?.name}</div>{" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {item.type === "ball" ? <BallIcon /> : ""}
                  </div>
                );
              })}
            </div>
            <SceneWithDrawables
              width={imgWidth}
              height={imgHeight}
              drawTool={drawTool}
              color={"green"}
              drawables={drawables}
              setDrawables={setDrawables}
              drawToolMenuFlag={drawToolMenuFlag}
            />
          </div>
          <div className="button-line">
            <div className="circles">
              <div
                className="circle red"
                onMouseDown={() => itemPicked("circle", true, -1, "red")}
                onTouchStart={() => itemPicked("circle", true, -1, "red")}
              >
                {currentNumbers[0]}
              </div>
              <div
                className="circle blue"
                onMouseDown={() => itemPicked("circle", true, -1, "blue")}
                onTouchStart={() => itemPicked("circle", true, -1, "blue")}
              >
                {currentNumbers[1]}
              </div>
              <div
                className="circle brown"
                onMouseDown={() => itemPicked("circle", true, -1, "brown")}
                onTouchStart={() => itemPicked("circle", true, -1, "brown")}
              >
                {currentNumbers[2]}
              </div>
              <div
                className="circle yellow"
                onMouseDown={() => itemPicked("circle", true, -1, "yellow")}
                onTouchStart={() => itemPicked("circle", true, -1, "yellow")}
              >
                {currentNumbers[3]}
              </div>
              <div
                className="circle green"
                onMouseDown={() => itemPicked("circle", true, -1, "green")}
                onTouchStart={() => itemPicked("circle", true, -1, "green")}
              >
                {currentNumbers[4]}
              </div>
              <div
                className="circle white"
                onMouseDown={() => itemPicked("circle", true, -1, "white")}
                onTouchStart={() => itemPicked("circle", true, -1, "white")}
              >
                {currentNumbers[5]}
              </div>
              <div
                className="circle grey"
                onMouseDown={() => itemPicked("circle", true, -1, "grey")}
                onTouchStart={() => itemPicked("circle", true, -1, "grey")}
              >
                {currentNumbers[6]}
              </div>
              <div
                className="circle black"
                onMouseDown={() => itemPicked("circle", true, -1, "black")}
                onTouchStart={() => itemPicked("circle", true, -1, "black")}
              >
                {currentNumbers[7]}
              </div>

              <div
                className="point purple"
                onMouseDown={() => itemPicked("point", true, -1, "purple")}
                onTouchStart={() => itemPicked("point", true, -1, "purple")}
              />
              <div
                className="point orange"
                onMouseDown={() => itemPicked("point", true, -1, "orange")}
                onTouchStart={() => itemPicked("point", true, -1, "orange")}
              />
              <div
                className="point springgreen"
                onMouseDown={() => itemPicked("point", true, -1, "springgreen")}
                onTouchStart={() =>
                  itemPicked("point", true, -1, "springgreen")
                }
              />
              <div
                className="point cornflowerblue"
                onMouseDown={() =>
                  itemPicked("point", true, -1, "cornflowerblue")
                }
                onTouchStart={() =>
                  itemPicked("point", true, -1, "cornflowerblue")
                }
              />
              <div
                className="ball"
                onMouseDown={() => itemPicked("ball", true, -1)}
                onTouchStart={() => itemPicked("ball", true, -1)}
              >
                <BallIcon />
              </div>
            </div>
            <div className="button-group">
              <div
                className={"button"}
                onClick={() => setDrawToolMenuFlag(!drawToolMenuFlag)}
              >
                {
                  {
                    0: <CursorIcon />,
                    1: <PencilIcon />,
                    2: <ArrowIcon />,
                    3: <CircleIcon />,
                    4: <SquareIcon />,
                    5: <TypeIcon />,
                  }[drawTool]
                }
              </div>
              <div className={drawToolMenuFlag ? "draw-tool-menu" : "hidden"}>
                <div
                  className="button"
                  onClick={() => {
                    setDrawTool(0);
                    setDrawToolMenuFlag(false);
                  }}
                  onTouchEnd={() => {
                    setDrawTool(0);
                    setDrawToolMenuFlag(false);
                  }}
                >
                  <CursorIcon />
                </div>
                <div
                  className="button"
                  onClick={() => {
                    setDrawTool(1);
                    setDrawToolMenuFlag(false);
                  }}
                  onTouchEnd={() => {
                    setDrawTool(1);
                    setDrawToolMenuFlag(false);
                  }}
                >
                  <PencilIcon />
                </div>
                <div
                  className="button"
                  onClick={() => {
                    setDrawTool(2);
                    setDrawToolMenuFlag(false);
                  }}
                  onTouchEnd={() => {
                    setDrawTool(2);
                    setDrawToolMenuFlag(false);
                  }}
                >
                  <ArrowIcon />
                </div>
                <div
                  className="button"
                  onClick={() => {
                    setDrawTool(3);
                    setDrawToolMenuFlag(false);
                  }}
                  onTouchEnd={() => {
                    setDrawTool(3);
                    setDrawToolMenuFlag(false);
                  }}
                >
                  <CircleIcon />
                </div>
                <div
                  className="button"
                  onClick={() => {
                    setDrawTool(4);
                    setDrawToolMenuFlag(false);
                  }}
                  onTouchEnd={() => {
                    setDrawTool(4);
                    setDrawToolMenuFlag(false);
                  }}
                >
                  <SquareIcon />
                </div>
                {/* <div className="button" onClick={() => { setDrawTool(5); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(5); setDrawToolMenuFlag(false) }}
                  >
                  <TypeIcon />
                </div> */}
                <div
                  className="button"
                  onClick={() => setDrawToolMenuFlag(false)}
                >
                  {
                    {
                      0: <CursorIcon />,
                      1: <PencilIcon />,
                      2: <ArrowIcon />,
                      3: <CircleIcon />,
                      4: <SquareIcon />,
                      5: <TypeIcon />,
                    }[drawTool]
                  }
                </div>
              </div>
              <div className="button">
                <Tooltip title="Rotate">
                  <RotateIcon />
                </Tooltip>
              </div>
              <div
                className="button"
                onClick={() => {
                  setEachFrameCircle([]);
                  setNewPoints([]);
                  setNewBalls([]);
                  setDrawables([]);
                }}
              >
                <Tooltip title="Remove all">
                  <TrashIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={rosterShowFlag ? "roster show" : "roster"}>
          <div className="top-user-info">
            <img src={mainLogo} alt="" />
            <div className="user-avatar">
              <Tooltip title="User">
                <UserIcon />
              </Tooltip>
              Williams
            </div>
          </div>
          <div className="table">
            <div className="top">
              <div className="left">
                <div className="title">Offense</div>
                <div className="list">
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                </div>
              </div>
              <div className="right">
                <div className="title">Defense</div>
                <div className="list">
                  <div className="plan">Man-to-Man</div>
                  <div className="plan">2-3 Zone</div>
                  <div className="plan">1-3-1 Zone</div>
                  <div className="plan">3-2 Zone</div>
                  <div className="plan">Custom</div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="title">Roster</div>
              <div className="columns">
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
