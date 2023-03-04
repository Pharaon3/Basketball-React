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
import { ReactComponent as ArrowIcon } from "../assets/svg/mouse-pointer.svg";
import { ReactComponent as PointerIcon } from "../assets/svg/x.svg";
import { ReactComponent as CircleIcon } from "../assets/svg/circle.svg";
import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
import { ReactComponent as TypeIcon } from "../assets/svg/type.svg";

import mainLogo from "../assets/logo.png";
import html2canvas from "html2canvas";
import SceneWithDrawables from "../components/SceneWithDrawables";
var onceFlag = true

function MainPage({
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
    if (creatingFlag) {
      var tempCurrentId = colorArray.indexOf(color)
      const newObject = {
        color: color,
        number: currentNumbers[tempCurrentId],
        name: "",
        mousePosX: mousePosX,
        mousePosY: mousePosY,
        imgWidth: imgWidth
      }
      newCircles.push(newObject)
      const nextCurrentNumbers = currentNumbers.map((item, index) => {
        if (index !== tempCurrentId) return item;
        else return item + 1
      });
      setCurrentNumbers(nextCurrentNumbers);
    }
  }
  const circleReleased = () => {
    if (dragCircleItem === -2) return
    const releasingId = dragCircleItem > -1 ? dragCircleItem : newCircles?.length - 1
    const nextNewCircles = newCircles?.map((item, index) => {
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
    setNewCircles(nextNewCircles)
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


  //////////drawPenciling lines/////////////////////////////////////////
  // const canvasRef = useRef(null);
  // const ctxRef = useRef(null);
  // const [isdrawPenciling, setIsdrawPenciling] = useState(false);
  // // const [lineWidth, setLineWidth] = useState(5);
  // // const [lineColor, setLineColor] = useState("blue");

  // const startPencildrawPenciling = (e) => {
  //   console.log(e)
  //   if(drawTool!==1) return
  //   ctxRef.current.beginPath();
  //   ctxRef.current.moveTo(
  //     e.nativeEvent.offsetX, 
  //     e.nativeEvent.offsetY
  //   );
  //   setIsdrawPenciling(true);
  // };
  // const startPencildrawPencilingByTouch = (e) => {
  //   console.log(e)
  //   if(drawTool!==1) return
  //   ctxRef.current.beginPath();
  //   var rect = e.target.getBoundingClientRect();
  //   var x = e.targetTouches[0].pageX - rect.left;
  //   var y = e.targetTouches[0].pageY - rect.top;
  //   ctxRef.current.moveTo(x,y);
  //   setIsdrawPenciling(true);
  // };

  // // Function for ending the drawPenciling
  // const endPencildrawPenciling = () => {
  //   if(drawTool!==1) return
  //   ctxRef.current.closePath();
  //   setIsdrawPenciling(false);
  // };

  // const drawPencil = (e) => {
  //   if(drawTool!==1) return
  //   if (!isdrawPenciling) {
  //     return;
  //   }
  //   ctxRef.current.lineTo(
  //     e.nativeEvent.offsetX, 
  //     e.nativeEvent.offsetY
  //   );

  //   ctxRef.current.stroke();
  // };
  // const drawPencilByTouch = (e) => {
  //   if(drawTool!==1) return
  //   if (!isdrawPenciling) {
  //     return;
  //   }
  //   var rect = e.target.getBoundingClientRect();
  //   var x = e.targetTouches[0].pageX - rect.left;
  //   var y = e.targetTouches[0].pageY - rect.top;
  //   ctxRef.current.lineTo(x,y);

  //   ctxRef.current.stroke();
  // };
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   ctx.lineCap = "round";
  //   ctx.lineJoin = "round";
  //   // ctx.strokeStyle = lineColor;
  //   // ctx.lineWidth = lineWidth;
  //   ctx.strokeStyle = "blue";
  //   ctx.lineWidth = 3;
  //   ctxRef.current = ctx;
  // // }, [lineColor, lineWidth]);
  // });
  /////////////////////////////////////////////////////////////////////////

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
              <div className="button" onClick={() => navigate("/animation")}>
                <VideoIcon style={{ color: "red", stroke: "red" }} />
              </div>
            </div>
            <div className="button-group">
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
            <div id="new-circles" style={(drawTool !== 0) ? { pointerEvents: 'none' } : {}}>
              {
                newCircles?.map((item, index) => {
                  const defaultStyle = { top: `${item?.mousePosY * (imgWidth / item?.imgWidth) - positionCircleDiff}px`, left: `${item?.mousePosX * (imgWidth / item?.imgWidth) - positionCircleDiff}px` }
                  const dragStyle = { top: `${mousePosY - positionCircleDiff}px`, left: `${mousePosX - positionCircleDiff}px` }
                  var contextFlag = false
                  return (
                    <div className={'circle ' + item?.color} key={"new-circle-" + index}
                      style={(dragCircleItem === index || (dragCircleItem === -1 && index === newCircles?.length - 1)) ? dragStyle : defaultStyle}
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
                          const nextNewCircles = newCircles?.map((itemM, indexX) => {
                            if (indexX === index) {
                              return {
                                ...itemM,
                                number: e.target.value,
                              };
                            }
                            else return itemM
                          })
                          setNewCircles(nextNewCircles)
                        }} /></p>
                        <p>Name   <input value={item?.name} onChange={(e) => {
                          const nextNewCircles = newCircles?.map((itemM, indexX) => {
                            if (indexX === index) {
                              return {
                                ...itemM,
                                name: e.target.value,
                              };
                            }
                            else return itemM
                          })
                          setNewCircles(nextNewCircles)
                        }} /></p>
                        <div className="delete-button" onClick={() => {
                          setDropMenuItem(-1)
                          setNewCircles([...newCircles?.slice(0, index), ...newCircles?.slice(index + 1)])
                        }
                        }
                          onTouchStart={() => {
                            setDropMenuItem(-1)
                            setNewCircles([...newCircles?.slice(0, index), ...newCircles?.slice(index + 1)])
                          }}>Delete</div>
                      </div>
                      <div className="name">{item?.name}</div>
                    </div>
                  )
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
              drawables={drawables} setDrawables={setDrawables} drawToolMenuFlag={drawToolMenuFlag}/>
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

export default MainPage;
