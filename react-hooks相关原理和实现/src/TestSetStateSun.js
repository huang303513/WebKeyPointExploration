import React, { Component } from "react";

class Sun extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      index: 0
    };
  }

  componentWillUpdate() {
    // console.log("sun componentWillUpdate");
  }

  componentDidUpdate() {
    // console.log("sun componentDidUpdate");
  }

  componentDidMount() {
    // console.log("sun componentDidMount");
    console.log("sun SetState调用setState");
    this.setState({
      index: this.state.index + 1
    });
    console.log("sun state", this.state.index);

    console.log("sun SetState调用setState");
    this.setState({
      index: this.state.index + 1
    });
    console.log("sun state", this.state.index);
  }

  render() {
    return (
      <div>
        <div>sun1</div>
      </div>
    );
  }
}

export default Sun;
