import React, { Component } from "react";
import { Stage, Layer, Arrow, Circle, Line, Rect, Group, Text } from "react-konva";
import "./SceneWithDrawables.scss";

const strickColor = "blue";
const strokeWidth = 5;
var patterDragableFlag = false

class Drawable {
    constructor(startx, starty) {
        this.startx = startx;
        this.starty = starty;
    }
}

class NoAction extends Drawable { }

class ArrowDrawable extends Drawable {
    constructor(startx, starty) {
        super(startx, starty);
        this.x = startx;
        this.y = starty;
    }
    registerMovement(x, y) {
        this.x = x;
        this.y = y;
    }
    render() {
        const points = [this.startx, this.starty, this.x, this.y];
        // console.log(points[0], points[1], points[2], points[3])
        if(points[0] === points[2] && points[1] === points[3]) return
        return <Arrow points={points} fill="black" stroke={strickColor} strokeWidth={strokeWidth} draggable={patterDragableFlag}/>;
    }
}

class CircleDrawable extends ArrowDrawable {
    constructor(startx, starty) {
        super(startx, starty);
        this.x = startx;
        this.y = starty;
    }
    render() {
        const dx = this.startx - this.x;
        const dy = this.starty - this.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        return (
            <Circle radius={radius} x={this.startx} y={this.starty} stroke={strickColor} strokeWidth={strokeWidth} draggable={patterDragableFlag}/>
        );
    }
}

class RectDrawable extends ArrowDrawable {
    constructor(startx, starty) {
        super(startx, starty);
        this.x = startx;
        this.y = starty;
    }
    render() {
        const dx = this.x - this.startx;
        const dy = this.y - this.starty;
        return (
            <Rect width={dx} height={dy} x={this.startx} y={this.starty} stroke={strickColor} strokeWidth={strokeWidth} draggable={patterDragableFlag} />
        );
    }
}

class TextDrawable extends ArrowDrawable {
    constructor(startx, starty) {
        super(startx, starty);
        this.x = startx;
        this.y = starty;
    }
    render() {
        return (
            <Text x={this.startx} y={this.starty} text='Simple Text' fontSize={30} fontFamily='Calibri' fill={strickColor} draggable={patterDragableFlag}/>
        );
    }
}

class FreePathDrawable extends Drawable {
    constructor(startx, starty) {
        super(startx, starty);
        this.points = [startx, starty];
    }
    registerMovement(x, y) {
        this.points = [...this.points, x, y];
    }
    render() {
        return <Line points={this.points} fill="black" stroke={strickColor} strokeWidth={strokeWidth} draggable={patterDragableFlag} />;
    }
}

class SceneWithDrawables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // drawables: [],
            newDrawable: [],
            newDrawableType: "FreePathDrawable",
            mouseDownFlag: false
        };
    }

    getNewDrawableBasedOnType = (x, y, type) => {
        const drawableClasses = {
            NoAction,
            FreePathDrawable,
            ArrowDrawable,
            CircleDrawable,
            RectDrawable,
            TextDrawable
        };
        return new drawableClasses[type](x, y);
    };

    handleMouseDown = e => {
        if (this.props.drawTool === 0 || this.props.drawToolMenuFlag) return
        // console.log("mouse-down")
        const { newDrawable } = this.state;
        if (newDrawable.length === 0) {
            const { x, y } = e?.target?.getStage()?.getPointerPosition();
            const newDrawable = this.getNewDrawableBasedOnType(
                x,
                y,
                this.state.newDrawableType
            );
            this.setState({
                newDrawable: [newDrawable]
            });
        }
        this.setState({
            mouseDownFlag: true
        });
    };

    handleMouseUp = e => {
        if (this.props.drawTool === 0 || this.props.drawToolMenuFlag) return
        // console.log("mouse-up")
        const { newDrawable } = this.state;
        const { drawables } = this.props;
        if (newDrawable.length === 1) {
            const { x, y } = e?.target?.getStage()?.getPointerPosition();
            const drawableToAdd = newDrawable[0];
            drawableToAdd.registerMovement(x, y);
            drawables.push(drawableToAdd);
            this.setState({
                newDrawable: [],
                drawables
            });
            this.props.setDrawables(drawables)
        }
        this.setState({
            mouseDownFlag: false
        });
    };

    handleMouseMove = e => {
        if (this.props.drawTool === 0 || this.props.drawToolMenuFlag) return
        if (!this.state.mouseDownFlag) return
        // console.log("mouse-move")
        const { newDrawable } = this.state;
        if (newDrawable.length === 1) {
            const { x, y } = e?.target?.getStage()?.getPointerPosition();
            const updatedNewDrawable = newDrawable[0];
            updatedNewDrawable.registerMovement(x, y);
            this.setState({
                newDrawable: [updatedNewDrawable]
            });
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.drawTool === 0) {
                this.setState({ newDrawableType: "NoAction" })
                patterDragableFlag = true
            }
            else if (this.props.drawTool === 1) {
                this.setState({ newDrawableType: "FreePathDrawable" })
                patterDragableFlag = false
            }
            else if (this.props.drawTool === 2) {
                this.setState({ newDrawableType: "ArrowDrawable" })
                patterDragableFlag = false
            }
            else if (this.props.drawTool === 3) {
                this.setState({ newDrawableType: "CircleDrawable" })
                patterDragableFlag = false
            }
            else if (this.props.drawTool === 4) {
                this.setState({ newDrawableType: "RectDrawable" })
                patterDragableFlag = false
            }
            else if (this.props.drawTool === 5) {
                this.setState({ newDrawableType: "TextDrawable" })
                patterDragableFlag = false
            }
        }
    }
    render() {
        // console.log(this.props.drawables, this.state.newDrawable)
        const drawables = [...this.props.drawables, ...this.state.newDrawable];
        return (
            <div className='SceneWithDrawables'>
                <Stage
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}

                    onTouchStart={this.handleMouseDown}
                    onTouchEnd={this.handleMouseUp}
                    onTouchMove={this.handleMouseMove}

                    width={this.props.width}
                    height={this.props.height}
                >
                    <Layer>
                        {drawables.map((drawable, index) => {
                            return <Group key={"drawable" + index}>
                                {drawable?.render()}
                            </Group>
                        })}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default SceneWithDrawables;
