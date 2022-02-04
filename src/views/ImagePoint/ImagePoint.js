import React, { Component, createRef } from "react";
import { Stage, Layer, Group, Circle, Label, Text } from 'react-konva';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
      showModal: false,
      deleteCircleList: []
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
          id={this.state.circleList.length}
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

    // // https://stackoverflow.com/questions/64473531/how-to-obtain-id-of-konva-label-from-konvas-dblclick-event
    // let nodes = e.target.findAncestors('Label', true);
    // if (nodes.length > 0) {
    //   for (let i = 0; i < nodes.length; i++){
    //     let id = nodes[i].getAttr("id")              
    //     console.log('shape ' + i + ' ID (dblclick)', id )
    //   }
    // } else {
    //       console.log('ID (dblclick) = ' + parseInt(e.target.id()));
    // }

  }

  confirmDelete() {
    console.log (this.state.circleList);

    this.modalToggle();
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

  modalToggle = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleCheckboxHandler = (del_index) => () => {
    // https://stackoverflow.com/questions/66434403/how-to-get-multiple-checkbox-values-in-react-js
    this.setState({
      deleteCircleList : [
        ...this.state.deleteCircleList,
        this.state.deleteCircleList[del_index[del_index]] ? null : {[del_index] : del_index}
      ]}, () => console.log(this.state.deleteCircleList));
  };

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

        <Modal isOpen={this.state.showModal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>Delete Circle Point</ModalHeader>
          <ModalBody>
            <ul>
            {
              this.state.circleList.map((cur, index) => <CirclePointList 
                key={index} 
                label={index+1} 
                toggleCheckboxHandler={this.toggleCheckboxHandler}
                deleteCircleList={this.state.deleteCircleList} />)
            }
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmDelete}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }

}

class CirclePointList extends Component {
  render () {
    return <li style={{'listStyleType': 'none'}}>
      <input 
        type="checkbox" 
        style={{'marginRight': '15px'}} 
        onChange={this.props.toggleCheckboxHandler(this.props.label)}
        checked={this.props.deleteCircleList[this.props.label-1]} />   
      Circle Point {this.props.label} </li>
  }
}

export default ImagePoint

