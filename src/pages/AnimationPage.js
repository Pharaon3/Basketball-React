import React, { useEffect, useState } from "react";
import "./AnimationPage.scss";
import { useNavigate } from "react-router-dom";
import fieldLine from "../assets/field-line-with-logo.png";
import fieldWithoutLine from "../assets/field-without-line.png";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow-left.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
// import { ReactComponent as CameraIcon } from "../assets/svg/camera.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
// import { ReactComponent as BookmarkIcon } from "../assets/svg/bookmark.svg";
import { ReactComponent as FieldIcon } from "../assets/svg/field.svg";
import { ReactComponent as MinimizeIcon } from "../assets/svg/minimize.svg";
import { ReactComponent as MaximizeIcon } from "../assets/svg/maximize.svg";
import { ReactComponent as VideoIcon } from "../assets/svg/video.svg";
import { ReactComponent as FilmIcon } from "../assets/svg/film.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";
// import { ReactComponent as UsersIcon } from "../assets/svg/users.svg"; 

import { ReactComponent as GlobeIcon } from "../assets/svg/globe.svg";
import { ReactComponent as HelpCircleIcon } from "../assets/svg/help-circle.svg";
import { ReactComponent as LogInIcon } from "../assets/svg/log-in.svg";

import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
// import { ReactComponent as PlayCircleIcon } from "../assets/svg/play-circle.svg";
import { ReactComponent as PauseIcon } from "../assets/svg/pause.svg";
// import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
// import { ReactComponent as RepeatIcon } from "../assets/svg/repeat.svg";

import { ReactComponent as BallIcon } from "../assets/svg/basketball.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as RotateIcon } from "../assets/svg/rotate-ccw.svg";
import { ReactComponent as UserIcon } from "../assets/svg/user.svg";

import { ReactComponent as PencilIcon } from "../assets/svg/pencil.svg";
import { ReactComponent as ArrowIcon } from "../assets/svg/mouse-pointer.svg";
import { ReactComponent as PointerIcon } from "../assets/svg/x.svg";
import { ReactComponent as CircleIcon } from "../assets/svg/circle.svg";
import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
import { ReactComponent as TypeIcon } from "../assets/svg/type.svg";

import { CurveInterpolator } from 'curve-interpolator';
import {
  NaturalCurve
} from "react-svg-curve";

import mainLogo from "../assets/logo.png";
import html2canvas from "html2canvas";
import SceneWithDrawables from "../components/SceneWithDrawables";
var onceFlag = true

function AnimationPage({
  fieldLineFlag, setFieldLineFlag,
  fullScreenFlag, setFullScreenFlag,
  fullScreenHandle,
  imgWidth, setImgWidth,
  imgHeight, setImgHeight,
  windowsWidth, setWindowsWidth,
  mousePosX, setMousePosX,
  mousePosY, setMousePosY,
  newCircles, setNewCircles,
  newPoints, setNewPoints,
  newBalls, setNewBalls,
  positionCircleDiff, setPositionCircleDiff,
  positionPointDiff, setPositionPointDiff,
  positionBallDiff, setPositionBallDiff
}) {
  const navigate = useNavigate();
  const [dragCircleItem, setDragCircleItem] = useState(-2)
  const [dragPointItem, setDragPointItem] = useState(-2)
  const [dragBallItem, setDragBallItem] = useState(-2)
  const [dropMenuItem, setDropMenuItem] = useState(-1)
  const [rosterShowFlag, setRosterShowFlag] = useState(false)
  const [currentNumbers, setCurrentNumbers] = useState([1, 1, 1, 1, 1, 1, 1, 1])
  const colorArray = ['red', 'blue', 'brown', 'yellow', 'green', 'white', 'grey', 'black']
  const [drawToolMenuFlag, setDrawToolMenuFlag] = useState(false)
  const [drawTool, setDrawTool] = useState(0)
  const [drawables, setDrawables] = useState([])
  const [frame, setFrame] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [eachFrameCircle, setEachFrameCircle] = useState([])
  const [isMiddlePicked, setIsMiddlePicked] = useState(0)
  const [allCircleData, setAllCircleData] = useState([])
  const [circleTrack, setCircleTrack] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const [circleId, setCircleId] = useState(0)

  useEffect(() => {
    if (!document.mozFullScreen && !document.webkitIsFullScreen)
      setFullScreenFlag(false);
    else setFullScreenFlag(true);
  });
  useEffect(() => {
    if (!onceFlag) return
    onceFlag = false
    const interval = setInterval(() => {
      const tempInnerWidth = window.innerWidth
      setWindowsWidth(tempInnerWidth)
      setImgWidth(document?.getElementById("image-to-download")?.getBoundingClientRect()?.width)
      setImgHeight(document?.getElementById("image-to-download")?.getBoundingClientRect()?.height)
      if (tempInnerWidth > 1170) {
        setPositionCircleDiff(18)
        setPositionPointDiff(10)
        setPositionBallDiff(15)
      }
      else if (tempInnerWidth > 480) {
        setPositionCircleDiff(13)
        setPositionPointDiff(7)
        setPositionBallDiff(10)
      }
      else {
        setPositionCircleDiff(9)
        setPositionPointDiff(6)
        setPositionBallDiff(8)
      }
      return () => clearInterval(interval);
    }, 50);
  }, [windowsWidth, setWindowsWidth, setImgWidth, setImgHeight, setPositionCircleDiff, setPositionPointDiff, setPositionBallDiff]);
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
    var bounds = document.getElementById("image-to-download").getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    setMousePosX(x);
    setMousePosY(y);
  }
  const setPositionByTouch = (e) => {
    var bounds = document.getElementById("image-to-download").getBoundingClientRect();
    var x = e.changedTouches[0].clientX - bounds.left;
    var y = e.changedTouches[0].clientY - bounds.top;
    setMousePosX(x + 1);
    setMousePosY(y + 1);
  }
  /////////////////////////////////////////////////////////////////////////////////
  const circlePicked = (creatingFlag, index, color) => {
    if (dropMenuItem > -1) return
    setDragCircleItem(index)
    setDropMenuItem(-1)
    let newEachFrameCircle = eachFrameCircle
    if (creatingFlag) {
      var tempCurrentId = colorArray.indexOf(color)
      const newObject = {
        id: circleId,
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
        isMiddle: false
      }
      setCircleId(circleId + 1)
      newEachFrameCircle.push(newObject)
      setEachFrameCircle(newEachFrameCircle)
      const nextNewCircles = newCircles.map((item, index) => {
        if (index === currentFrame) {
          return newEachFrameCircle
        }
        else if (index > currentFrame) {
          let letItem = new Array()
          letItem = [...item, newObject]
          return [...item, newObject]
        }
        else {
          return item
        }
      })
      setNewCircles(nextNewCircles)
      if (nextNewCircles.length === 0) {
        setNewCircles(newEachFrameCircle)
      }
      const nextCurrentNumbers = currentNumbers.map((item, index) => {
        if (index !== tempCurrentId) return item;
        else return item + 1
      });
      setCurrentNumbers(nextCurrentNumbers);
    }
  }
  const circleReleased = () => {
    if (dragCircleItem === -2) return
    if (isMiddlePicked) {
      const releasingId = dragCircleItem > -1 ? dragCircleItem : eachFrameCircle?.length - 1
      const newEachFrameCircle = eachFrameCircle?.map((item, index) => {
        if (index === releasingId) {
          if (currentFrame > 0) {
            if (newCircles[currentFrame - 1].length > index) {
              if (isMiddlePicked == 1) {
                return {
                  ...item,
                  middleX1: mousePosX / imgWidth,
                  middleY1: mousePosY / imgWidth
                }
              }
              if (isMiddlePicked == 2) {
                return {
                  ...item,
                  middleX2: mousePosX / imgWidth,
                  middleY2: mousePosY / imgWidth
                }
              }
            }
            else {
              return {
                ...item,
              };
            }
          }
          else {
            return {
              ...item,
            };
          }
        }
        else return item
      })
      setEachFrameCircle(newEachFrameCircle);
      const nextNewCircles = newCircles.map((item, index) => {
        if (index === currentFrame) {
          return newEachFrameCircle
        }
        else {
          return item
        }
      })
      setNewCircles(nextNewCircles)
    }
    else {
      const releasingId = dragCircleItem > -1 ? dragCircleItem : eachFrameCircle?.length - 1
      const newEachFrameCircle = eachFrameCircle?.map((item, index) => {
        if (index === releasingId) {
          if (currentFrame > 0) {
            if (newCircles[currentFrame - 1].length > index) {
              let oldX = newCircles[currentFrame - 1][index]["mousePosX"] / newCircles[currentFrame - 1][index]["imgWidth"]
              let oldY = newCircles[currentFrame - 1][index]["mousePosY"] / newCircles[currentFrame - 1][index]["imgWidth"]
              let newX = mousePosX / imgWidth
              let newY = mousePosY / imgWidth
              return {
                ...item,
                mousePosX: mousePosX,
                mousePosY: mousePosY,
                imgWidth: imgWidth,
                isMiddle: true,
                middleX1: (newX - oldX) * 0.3 + oldX,
                middleY1: (newY - oldY) * 0.3 + oldY,
                middleX2: (newX - oldX) * 0.7 + oldX,
                middleY2: (newY - oldY) * 0.7 + oldY
              }
            }
            else {
              return {
                ...item,
                mousePosX: mousePosX,
                mousePosY: mousePosY,
                imgWidth: imgWidth
              };
            }
          }
          else {
            return {
              ...item,
              mousePosX: mousePosX,
              mousePosY: mousePosY,
              imgWidth: imgWidth
            };
          }
        }
        else return item
      })
      setEachFrameCircle(newEachFrameCircle);
      const nextNewCircles = newCircles.map((item, index) => {
        if (index === currentFrame) {
          return newEachFrameCircle
        }
        else {
          return item
        }
      })
      setNewCircles(nextNewCircles)
    }
    setIsMiddlePicked(0)
    setDragCircleItem(-2)
  }
  const pointPicked = (creatingFlag, index, color) => {
    setDragPointItem(index)
    if (creatingFlag) {
      const newObject = {
        color: color,
        mousePosX: mousePosX,
        mousePosY: mousePosY,
        imgWidth: imgWidth
      }
      newPoints.push(newObject)
    }
  }
  const pointReleased = () => {
    if (dragPointItem === -2) return
    const releasingId = dragPointItem > -1 ? dragPointItem : newPoints?.length - 1
    const nextNewPoints = newPoints?.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          imgWidth: imgWidth
        };
      }
      else return item
    })
    setNewPoints(nextNewPoints)
    setDragPointItem(-2)
  }
  const ballPicked = (creatingFlag, index) => {
    setDragBallItem(index)
    if (creatingFlag) {
      const newObject = {
        mousePosX: mousePosX,
        mousePosY: mousePosY,
        imgWidth: imgWidth
      }
      newBalls.push(newObject)
    }
  }
  const ballReleased = () => {
    if (dragBallItem === -2) return
    const releasingId = dragBallItem > -1 ? dragBallItem : newBalls?.length - 1
    const nextNewBalls = newBalls?.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          imgWidth: imgWidth
        };
      }
      else return item
    })
    setNewBalls(nextNewBalls)
    setDragBallItem(-2)
  }

  let rows = [];
  for (let i = 0; i <= frame; i++) {
    rows.push(
      <div key={"frame" + i} className="filmButton" onClick={() => {
        console.log("newCircles", newCircles)
        setCurrentFrame(i)
        if (newCircles.length < i + 1) newCircles.push(eachFrameCircle)
        setEachFrameCircle(newCircles[i])
      }}>
        <FilmIcon />
        <div>{i}</div>
      </div>
    );
  }

  const makeNewFrame = () => {
    let letframe = frame
    let letcurrentFrame = currentFrame
    setFrame(letframe + 1);
    setCurrentFrame(letframe + 1);
    if (letframe === 0) {
      newCircles.push(eachFrameCircle)
    }
    else {
      const lastFrame = newCircles[letframe]?.map((item, index) => {
        return {
          ...item,
          isMiddle: false,
          middleX1: 0,
          middleX2: 0,
          middleY1: 0,
          middleY2: 0
        }
      })
      console.log("lastFrame", lastFrame)
      newCircles.push(lastFrame)
      setEachFrameCircle(lastFrame)
    }
  }

  const segments = 100;

  const [count, setCount] = useState(0);
  const [playPos, setPlayPos] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count > segments - 1 ? 0 : count + 1);
    }, 10000);
  });

  const play = () => {
    setIsPlay(true)
    setCount(0)

    let letPlayPos = new Array()
    for (let index = 0; index < eachFrameCircle.length; index++) {
      let item = eachFrameCircle[index]
      if (item.isMiddle) {
        let oldOne = newCircles[currentFrame - 1][index]
        let x1 = oldOne["mousePosX"] * imgWidth / oldOne["imgWidth"]
        let x2 = item["mousePosX"] * imgWidth / item["imgWidth"]
        let y1 = oldOne["mousePosY"] * imgWidth / oldOne["imgWidth"]
        let y2 = item.mousePosY * imgWidth / item.imgWidth
        let xm1 = item.middleX1 * imgWidth
        let ym1 = item.middleY1 * imgWidth
        let xm2 = item.middleX2 * imgWidth
        let ym2 = item.middleY2 * imgWidth
        const points = [
          [x1, y1],
          [xm1, ym1],
          [xm2, ym2],
          [x2, y2]
        ];
        const interp1 = new CurveInterpolator(points, { tension: 0, alpha: 0.3 });
        const pts1 = interp1.getPoints(segments);
        letPlayPos.push(pts1)
      }
      else {
        letPlayPos.push([item.mousePosX, item.mousePosY])
      }
    }
    console.log(letPlayPos)
    setPlayPos(letPlayPos)
  }

  const pause = () => {

  }

  const stop = () => {
    setIsPlay(false)
  }

  return (
    <div className="MainPage">
      <div className="main">
        <div className="board"
          onClick={() => { if (rosterShowFlag) setRosterShowFlag(false) }}
          onMouseUp={() => { circleReleased(); pointReleased(); ballReleased(); setDrawToolMenuFlag(false) }}
          onTouchEnd={() => { circleReleased(); pointReleased(); ballReleased(); setDrawToolMenuFlag(false) }}
          onMouseLeave={() => { circleReleased(); pointReleased(); ballReleased() }}
          onMouseMove={(e) => setPositionByMouse(e)}
          onTouchMove={(e) => setPositionByTouch(e)}
          onTouchStart={(e) => setPositionByTouch(e)}>
          <div className="button-line">
            <div className="button-group">
              <div className="button" onClick={() => navigate("/main")}>
                <ArrowLeftIcon />
              </div>
              <div className="button" onClick={() => setRosterShowFlag(!rosterShowFlag)}>
                <MenuIcon />
              </div>
              <div className="button">
                <LinkIcon />
              </div>
              <div
                className="button"
                onClick={() =>
                  exportAsImage(
                    document.getElementById("image-to-download"),
                    "basketball-screen",
                    true
                  )}
              >
                <DownloadIcon />
              </div>
              <div
                className={fieldLineFlag ? "button" : "button clicked"}
                onClick={() => {
                  setFieldLineFlag(!fieldLineFlag);
                }}
              >
                <FieldIcon />
              </div>
              <div
                className={!fullScreenFlag ? "button" : "button clicked"}
                onClick={() => {
                  if (fullScreenFlag) fullScreenHandle.exit();
                  else fullScreenHandle.enter();
                  setFullScreenFlag(!fullScreenFlag);
                }}
              >
                {!fullScreenFlag ? <MaximizeIcon /> : <MinimizeIcon />}
              </div>
              <div style={{ width: 20 }} />
              {
                rows
              }
              {
                // curvLine
              }
              <div className="filmButton" onClick={makeNewFrame}>
                <FilmIcon />
                {/* <PlusIcon /> */}
                <div>+</div>
              </div>
            </div>
            <div className="button-group">
              <div style={{ marginRight: 20 }} className="button-group">
                <div className="button" onClick={play}>
                  <PlayIcon />
                </div>
                <div className="button">
                  <PauseIcon />
                </div>
                <div className="button" onClick={stop}>
                  <SquareIcon />
                </div>
              </div>
              <div className="button">
                <GlobeIcon />
              </div>
              <div className="button">
                <HelpCircleIcon />
              </div>
              <div className="button">
                <LogInIcon />
              </div>
            </div>
          </div>
          <div id="image-to-download" className="image-to-download">
            <img
              src={fieldLineFlag ? fieldLine : fieldWithoutLine}
              alt="BACKGROUND"
            />
            <svg width={imgWidth} height={imgHeight} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
              {
                eachFrameCircle?.map((item, index) => {
                  if (!isPlay) {
                    // const defaultStyle = { top: `${item?.mousePosY * (imgWidth / item?.imgWidth) - positionCircleDiff}px`, left: `${item?.mousePosX * (imgWidth / item?.imgWidth) - positionCircleDiff}px` }
                    const dragStyle = { display: 'none' }
                    var contextFlag = false
                    if (item.isMiddle) {
                      let oldOne = newCircles[currentFrame - 1][index]
                      let x1 = oldOne["mousePosX"] * imgWidth / oldOne["imgWidth"]
                      let x2 = item["mousePosX"] * imgWidth / item["imgWidth"]
                      let y1 = oldOne["mousePosY"] * imgWidth / oldOne["imgWidth"]
                      let y2 = item.mousePosY * imgWidth / item.imgWidth
                      let xm1 = item.middleX1 * imgWidth
                      let ym1 = item.middleY1 * imgWidth
                      let xm2 = item.middleX2 * imgWidth
                      let ym2 = item.middleY2 * imgWidth
                      if (dragCircleItem === index || (dragCircleItem === -1 && index === eachFrameCircle?.length - 1)) {
                        if (isMiddlePicked == 1) {
                          xm1 = mousePosX
                          ym1 = mousePosY
                        }
                        else if (isMiddlePicked == 2) {
                          xm2 = mousePosX
                          ym2 = mousePosY
                        }
                        else {
                          x2 = mousePosX
                          y2 = mousePosY
                        }
                      }
                      const points = [
                        [x1, y1],
                        [xm1, ym1],
                        [xm2, ym2],
                        [x2, y2]
                      ];
                      let curvLine = [];
                      const interp = new CurveInterpolator(points, { tension: 0, alpha: 0.3 });
                      const pts = interp.getPoints(segments);
                      for (let i = 0; i < segments - 2; i++) {
                        curvLine.push(
                          <NaturalCurve strokeDasharray="5" key={"curveLine" + i} data={[[pts[i][0], pts[i][1]], [pts[i + 1][0], pts[i + 1][1]]]} showPoints={false} />
                        );
                      }
                      return (
                        <g key={"track-" + index}>
                          {/* <line strokeDasharray="4" stroke="#555" x1={x1} y1={y1} x2={xm} y2={ym} strokeWidth="3">
                          </line>
                          <line strokeDasharray="4" stroke="#555" x1={xm} y1={ym} x2={x2} y2={y2} strokeWidth="3">
                          </line> */}
                          {curvLine}
                        </g>
                      )
                    }
                  }
                })
              }
            </svg>
            <div id="new-circles" style={(drawTool !== 0) ? { pointerEvents: 'none' } : {}}>
              {
                eachFrameCircle?.map((item, index) => {
                  if (!isPlay) {
                    var contextFlag = false
                    if (item.isMiddle) {
                      let oldOne = newCircles[currentFrame - 1][index]
                      const defaultStyle = { top: `${oldOne?.mousePosY * (imgWidth / oldOne?.imgWidth) - positionCircleDiff}px`, left: `${oldOne?.mousePosX * (imgWidth / oldOne?.imgWidth) - positionCircleDiff}px` }
                      return (
                        <div className={'circle old'} key={"old-circle-" + index} id={"old-circle-" + index} style={defaultStyle}>
                          {item?.number}
                        </div>
                      )
                    }
                  }
                })
              }
              {
                eachFrameCircle?.map((item, index) => {
                  let playPosX = 0, playPosY = 0
                  if (item.isMiddle && isPlay) {
                    playPosX = playPos[index][count][0]
                    playPosY = playPos[index][count][1]
                  }
                  const defaultStyle = isPlay ? { top: `${playPosY * (imgWidth / item?.imgWidth) - positionCircleDiff}px`, left: `${playPosX * (imgWidth / item?.imgWidth) - positionCircleDiff}px` }
                    : { top: `${item?.mousePosY * (imgWidth / item?.imgWidth) - positionCircleDiff}px`, left: `${item?.mousePosX * (imgWidth / item?.imgWidth) - positionCircleDiff}px` }
                  const dragStyle = { top: `${mousePosY - positionCircleDiff}px`, left: `${mousePosX - positionCircleDiff}px` }
                  var contextFlag = false
                  return (
                    <div className={'circle ' + item?.color} key={"new-circle-" + index}
                      style={(dragCircleItem === index && !isMiddlePicked || (dragCircleItem === -1 && index === eachFrameCircle?.length - 1 && !isMiddlePicked)) ? dragStyle : defaultStyle}
                      // style={defaultStyle}
                      onMouseDown={(e) => {
                        if (e.button === 2) return
                        circlePicked(false, index, "")
                      }}
                      onTouchStart={() => {
                        if (contextFlag) return
                        circlePicked(false, index, "")
                      }}
                      onContextMenu={(e) => {
                        contextFlag = true
                        e.preventDefault()
                        setDropMenuItem(index)
                      }}
                      onMouseLeave={() => {
                        setDropMenuItem(-1)
                      }}
                      onTouchEnd={() => {
                        contextFlag = false
                      }}>
                      {item?.number}
                      <div className={(dropMenuItem === index) ? "drop-menu" : "hidden"}>
                        <p>Number <input min={1} type="number" value={item?.number} onChange={(e) => {
                          const nexteachFrameCircle = eachFrameCircle?.map((itemM, indexX) => {
                            if (indexX === index) {
                              return {
                                ...itemM,
                                number: e.target.value,
                              };
                            }
                            else return itemM
                          })
                          setEachFrameCircle(nexteachFrameCircle)
                          var nextNewCircles = newCircles
                          nextNewCircles[currentFrame] = nexteachFrameCircle
                          setNewCircles(nextNewCircles)
                        }} /></p>
                        <p>Name   <input value={item?.name} onChange={(e) => {
                          const nexteachFrameCircle = eachFrameCircle?.map((itemM, indexX) => {
                            if (indexX === index) {
                              return {
                                ...itemM,
                                name: e.target.value,
                              };
                            }
                            else return itemM
                          })
                          setEachFrameCircle(nexteachFrameCircle)
                          var nextNewCircles = newCircles
                          nextNewCircles[currentFrame] = nexteachFrameCircle
                          setNewCircles(nextNewCircles)
                        }} /></p>
                        <div className="delete-button" onClick={() => {
                          setDropMenuItem(-1)
                          var nexteachFrameCircle = [...eachFrameCircle?.slice(0, index), ...eachFrameCircle?.slice(index + 1)]
                          setEachFrameCircle(nexteachFrameCircle)
                          var nextNewCircles = newCircles
                          nextNewCircles[currentFrame] = nexteachFrameCircle
                          setNewCircles(nextNewCircles)
                        }
                        }
                          onTouchStart={() => {
                            setDropMenuItem(-1)
                            var nexteachFrameCircle = [...eachFrameCircle?.slice(0, index), ...eachFrameCircle?.slice(index + 1)]
                            setEachFrameCircle(nexteachFrameCircle)
                            var nextNewCircles = newCircles
                            nextNewCircles[currentFrame] = nexteachFrameCircle
                            setNewCircles(nextNewCircles)
                          }}>Delete</div>
                      </div>
                      <div className="name">{item?.name}</div>
                    </div>
                  )
                })
              }
              {
                eachFrameCircle?.map((item, index) => {
                  if (!isPlay) {
                    const dragStyle = { top: `${mousePosY - positionCircleDiff}px`, left: `${mousePosX - positionCircleDiff}px` }
                    // const dragStyle = { display: 'none' }
                    var contextFlag = false
                    if (item.isMiddle) {
                      const defaultStyle1 = { top: `${item?.middleY1 * imgWidth - positionCircleDiff}px`, left: `${item?.middleX1 * imgWidth - positionCircleDiff}px` }
                      const defaultStyle2 = { top: `${item?.middleY2 * imgWidth - positionCircleDiff}px`, left: `${item?.middleX2 * imgWidth - positionCircleDiff}px` }
                      return (
                        <div key={"new-circle-middle-" + index}>
                          <div className='circle middle'
                            style={(dragCircleItem === index && isMiddlePicked === 1 || (dragCircleItem === -1 && index === eachFrameCircle?.length - 1 && isMiddlePicked === 1)) ? dragStyle : defaultStyle1}
                            onMouseDown={(e) => {
                              if (e.button === 2) return
                              setIsMiddlePicked(1)
                              circlePicked(false, index, "")
                            }}
                            onTouchStart={() => {
                              if (contextFlag) return
                              setIsMiddlePicked(1)
                              circlePicked(false, index, "")
                            }}>
                            {item?.number}
                          </div>
                          <div className='circle middle'
                            style={(dragCircleItem === index && isMiddlePicked === 2 || (dragCircleItem === -1 && index === eachFrameCircle?.length - 1 && isMiddlePicked === 2)) ? dragStyle : defaultStyle2}
                            onMouseDown={(e) => {
                              if (e.button === 2) return
                              setIsMiddlePicked(2)
                              circlePicked(false, index, "")
                            }}
                            onTouchStart={() => {
                              if (contextFlag) return
                              setIsMiddlePicked(2)
                              circlePicked(false, index, "")
                            }}>
                            {item?.number}
                          </div>
                        </div>
                      )
                    }
                  }
                })
              }
              {
                newPoints?.map((item, index) => {
                  const defaultStyle = { top: `${item?.mousePosY * (imgWidth / item?.imgWidth) - positionPointDiff}px`, left: `${item?.mousePosX * (imgWidth / item?.imgWidth) - positionPointDiff}px` }
                  const dragStyle = { top: `${mousePosY - positionPointDiff}px`, left: `${mousePosX - positionPointDiff}px` }
                  var contextFlag = false
                  return (
                    <div className={'point ' + item?.color} key={"new-point-" + index}
                      style={(dragPointItem === index || (dragPointItem === -1 && index === newPoints?.length - 1)) ? dragStyle : defaultStyle}
                      // style={defaultStyle}
                      onMouseDown={(e) => {
                        if (e.button === 2) return
                        pointPicked(false, index, "")
                      }}
                      onTouchStart={() => {
                        if (contextFlag) return
                        pointPicked(false, index, "")
                      }}
                      onContextMenu={(e) => {
                        contextFlag = true
                        e.preventDefault()
                        //Delete...................................................................
                        setNewPoints([...newPoints?.slice(0, index), ...newPoints?.slice(index + 1)])
                      }}
                      onTouchEnd={() => {
                        contextFlag = false
                      }}>
                    </div>
                  )
                })
              }
              {
                newBalls?.map((item, index) => {
                  const defaultStyle = { top: `${item?.mousePosY * (imgWidth / item?.imgWidth) - positionBallDiff}px`, left: `${item?.mousePosX * (imgWidth / item?.imgWidth) - positionBallDiff}px` }
                  const dragStyle = { top: `${mousePosY - positionBallDiff}px`, left: `${mousePosX - positionBallDiff}px` }
                  var contextFlag = false
                  return (
                    <div className='ball' key={"new-ball-" + index}
                      style={(dragBallItem === index || (dragBallItem === -1 && index === newBalls?.length - 1)) ? dragStyle : defaultStyle}
                      // style={defaultStyle}
                      onMouseDown={(e) => {
                        if (e.button === 2) return
                        ballPicked(false, index)
                      }}
                      onTouchStart={() => {
                        if (contextFlag) return
                        ballPicked(false, index)
                      }}
                      onContextMenu={(e) => {
                        contextFlag = true
                        e.preventDefault()
                        //Delete...................................................................
                        setNewBalls([...newBalls?.slice(0, index), ...newBalls?.slice(index + 1)])
                      }}
                      onTouchEnd={() => {
                        contextFlag = false
                      }}>
                      <BallIcon />
                    </div>
                  )
                })
              }
            </div>
            <SceneWithDrawables width={imgWidth} height={imgHeight} drawTool={drawTool} color={"green"}
              drawables={drawables} setDrawables={setDrawables} drawToolMenuFlag={drawToolMenuFlag} />

          </div>
          <div className="button-line">
            <div className="circles">
              <div className="circle red" onMouseDown={() => circlePicked(true, -1, "red")} onTouchStart={() => circlePicked(true, -1, "red")}>{currentNumbers[0]}</div>
              <div className="circle blue" onMouseDown={() => circlePicked(true, -1, "blue")} onTouchStart={() => circlePicked(true, -1, "blue")}>{currentNumbers[1]}</div>
              <div className="circle brown" onMouseDown={() => circlePicked(true, -1, "brown")} onTouchStart={() => circlePicked(true, -1, "brown")}>{currentNumbers[2]}</div>
              <div className="circle yellow" onMouseDown={() => circlePicked(true, -1, "yellow")} onTouchStart={() => circlePicked(true, -1, "yellow")}>{currentNumbers[3]}</div>
              <div className="circle green" onMouseDown={() => circlePicked(true, -1, "green")} onTouchStart={() => circlePicked(true, -1, "green")}>{currentNumbers[4]}</div>
              <div className="circle white" onMouseDown={() => circlePicked(true, -1, "white")} onTouchStart={() => circlePicked(true, -1, "white")}>{currentNumbers[5]}</div>
              <div className="circle grey" onMouseDown={() => circlePicked(true, -1, "grey")} onTouchStart={() => circlePicked(true, -1, "grey")}>{currentNumbers[6]}</div>
              <div className="circle black" onMouseDown={() => circlePicked(true, -1, "black")} onTouchStart={() => circlePicked(true, -1, "black")}>{currentNumbers[7]}</div>

              <div className="point purple" onMouseDown={() => pointPicked(true, -1, "purple")} onTouchStart={() => pointPicked(true, -1, "purple")} />
              <div className="point orange" onMouseDown={() => pointPicked(true, -1, "orange")} onTouchStart={() => pointPicked(true, -1, "orange")} />
              <div className="point springgreen" onMouseDown={() => pointPicked(true, -1, "springgreen")} onTouchStart={() => pointPicked(true, -1, "springgreen")} />
              <div className="point cornflowerblue" onMouseDown={() => pointPicked(true, -1, "cornflowerblue")} onTouchStart={() => pointPicked(true, -1, "cornflowerblue")} />
              <div className="ball" onMouseDown={() => ballPicked(true, -1)} onTouchStart={() => ballPicked(true, -1)}>
                <BallIcon />
              </div>
            </div>
            <div className="button-group">
              <div className={"button"} onClick={() => setDrawToolMenuFlag(!drawToolMenuFlag)}>
                {
                  {
                    0: <PointerIcon />,
                    1: <PencilIcon />,
                    2: <ArrowIcon />,
                    3: <CircleIcon />,
                    4: <SquareIcon />,
                    5: <TypeIcon />,
                  }[drawTool]
                }
              </div>
              <div className={drawToolMenuFlag ? "draw-tool-menu" : "hidden"}>
                <div className="button" onClick={() => { setDrawTool(0); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(0); setDrawToolMenuFlag(false) }}
                >
                  <PointerIcon />
                </div>
                <div className="button" onClick={() => { setDrawTool(1); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(1); setDrawToolMenuFlag(false) }}
                >
                  <PencilIcon />
                </div>
                <div className="button" onClick={() => { setDrawTool(2); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(2); setDrawToolMenuFlag(false) }}
                >
                  <ArrowIcon />
                </div>
                <div className="button" onClick={() => { setDrawTool(3); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(3); setDrawToolMenuFlag(false) }}
                >
                  <CircleIcon />
                </div>
                <div className="button" onClick={() => { setDrawTool(4); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(4); setDrawToolMenuFlag(false) }}
                >
                  <SquareIcon />
                </div>
                {/* <div className="button" onClick={() => { setDrawTool(5); setDrawToolMenuFlag(false) }}
                  onTouchEnd={() => { setDrawTool(5); setDrawToolMenuFlag(false) }}
                  >
                  <TypeIcon />
                </div> */}
                <div className="button" onClick={() => setDrawToolMenuFlag(false)}>
                  {
                    {
                      0: <PointerIcon />,
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
                <RotateIcon />
              </div>
              <div className="button" onClick={() => { setNewCircles([]); setNewPoints([]); setNewBalls([]); setDrawables([]) }}>
                <TrashIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={rosterShowFlag ? "roster show" : "roster"}>
          <div className="top-user-info">
            <img src={mainLogo} alt="" />
            <div className="user-avatar">
              <UserIcon />
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

export default AnimationPage;
