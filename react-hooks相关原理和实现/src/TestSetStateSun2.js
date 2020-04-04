import React, { Component } from "react";

class Sun2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentWillUpdate() {
    // console.log("sun2 componentWillUpdate");
  }

  componentDidUpdate() {
    // console.log("sun2 componentDidUpdate");
  }

  componentDidMount() {
    // console.log("sun2 componentDidMount");
    setTimeout(() => {
      console.log("sun2 调用setState");
      this.setState({
        index: this.state.index + 1
      });
      console.log("sun2 state", this.state.index);
      console.log("sun2 调用setState");
      this.setState({
        index: this.state.index + 1
      });
      console.log("sun2 state", this.state.index);
    }, 0);
  }

  render() {
    return (
      <div>
        <div>sun2</div>
      </div>
    );
  }
}

export default Sun2;
