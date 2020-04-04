import React, { Component } from "react";

class Sun3 extends Component {
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
    // console.log("sun3 调用setState");
    // this.setState({ index: this.state.index + 1 }, () => {
    //   console.log('sun3======>' + this.state.index);
    // })
    // console.log("sun3 调用setState");
    // this.setState({ index: this.state.index + 1 }, () => {
    //   console.log('sun3======>' + this.state.index);
    // })

    console.log("sun3 调用setState");
    this.setState((preState) => ({ index: preState.index + 1 }), () => {
      console.log('sun3======>' + this.state.index);
    })
    console.log("sun3 调用setState");
    this.setState(preState => ({ index: preState.index + 1 }), () => {
      console.log('sun3======>' + this.state.index);
    })
  }

  render() {
    return (
      <div>
        <div>sun3</div>
      </div>
    );
  }
}

export default Sun3;
