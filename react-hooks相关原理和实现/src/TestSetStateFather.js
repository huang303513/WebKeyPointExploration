import React, { Component } from "react";
import Sun from "./TestSetStateSun";
import Sun2 from "./TestSetStateSun2";
import Sun3 from "./TestSetStateSun3";

class Father extends Component {
    componentDidMount() {
        console.log('parent componentDidMount');
    }

  render() {
    return (
      <div>
        <Sun></Sun>
        <Sun2></Sun2>
        <Sun3></Sun3>
      </div>
    );
  }
}

export default Father;