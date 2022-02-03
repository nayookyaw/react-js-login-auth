import React, { Component, createRef } from "react";
import { Stage, Layer, Group, Circle, Label, Text } from 'react-konva';

import logoTroyX from '../../assets/map.jpg';

import Images from "./Images";

class ImagePoint extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: logoTroyX,
      circleList: [],
      stageRef: createRef(null),
      stageWidth: 0,
      stageHeight: 0,
    }

    this.confirmDelete = this.confirmDelete.bind(this);
  }
  
  
  handleClickImage = (e) => {
   
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = {x: stage.x(), y: stage.y()};

    const imageClickX = (pointerPosition.x - offset.x) * (1/stage.scaleX());
    const imageClickY = (pointerPosition.y - offset.y) * (1/stage.scaleX());

    // do stuff
    this.setState({
      circleList: [...this.state.circleList, 
        <Label 
          x={imageClickX}
          y={imageClickY}
          draggable
          onClick = {this.handleClickLabel}
        >
          <Circle
            width={25}
            height={25}
            fill="red"
            shadowBlur={5}
          />
          <Text text={this.state.circleList.length +1 } offsetX={3} offsetY={3} />
        </Label>
      ]
    })
  
  }

  handleClickLabel = (e) => {
    console.log ("click label haha");
    console.log (e);
  }

  confirmDelete() {
    console.log (this.state.circleList);
  }
  
  handleZoomStage = (event) => {

    const scaleBy = 1.01;

    event.evt.preventDefault();

    if (this.state.stageRef.current !== null) {

      const stage = this.state.stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      }
      stage.position(newPos);
      stage.batchDraw();

    }
    
  }

  render () {
    let { stageWidth , stageHeight } = this.state;

    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight * 0.5;

    return (
      <>
        <Stage
          style={{backgroundColor: 'rgb(166, 162, 154)', overflow: 'hidden'}}
          width={stageWidth}
          height={stageHeight}
          draggable
          onWheel={this.handleZoomStage}
          ref={this.state.stageRef}
        >
          <Layer>
            <Group>
              <Images img={this.state.image} handleClickImage={this.handleClickImage} />
              {this.state.circleList.length > 0 && this.state.circleList.map(curCircle=>curCircle) }
            </Group>
          </Layer>
        </Stage>
        <button onClick={this.confirmDelete}>Delete</button>
      </>
    )
  }

}

export default ImagePoint

