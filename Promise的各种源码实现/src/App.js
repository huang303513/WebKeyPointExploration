import React, { useCallback } from "react";
import "./App.css";
import logo from "./logo.svg";
import { testGenerator, testGeneratorV2 } from './asyncawait';
const Promise = require("./promise");

function App() {
  const TestPromise = useCallback(() => {
    console.warn("====Promise Test===");
    new Promise((resolve, reject) => {
      resolve("123");
    })
      .then(
        i => {
          console.warn("i===>" + i);
          return "i";
        },
        j => {
          console.warn("j===>" + j);
          return "j";
        }
      )
      .then(
        i2 => {
          console.warn("i2=====>" + i2);
          throw new Error("i2 throw error");
        },
        j2 => {
          console.warn("j2=====>" + j2);
          return "j2";
        }
      )
      .then(
        i3 => {
          console.warn("i3=====>" + i3);
        },
        j3 => {
          console.warn("j3=====>" + j3.message);
        }
      );
  }, []);

  const TestPromiseAll = useCallback(() => {
    console.warn("====PromiseAll Test===");
    var promise1 = new Promise((resolve, reject) => {
      resolve(3);
    });
    var promise2 = 42;
    var promise3 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 100, "foo");
    });

    Promise.all([promise1, promise2, promise3]).then(
      values => {
        console.log("values=======>" + values); //[3, 42, 'foo']
      },
      err => {
        console.warn(err);
      }
    );

    var p = Promise.all([]); // will be immediately resolved
    var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
    console.log("p=======>" + p);
    console.log("p2=======>" + p2);
    setTimeout(function() {
      console.log("the stack is now empty");
      console.log(p2);
    });
  }, []);

  const TestPromiseRace = useCallback(() => {
    Promise.race([
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(100);
        }, 1000);
      }),
      undefined,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(100);
        }, 100);
      })
    ]).then(
      data => {
        console.log("success ", data);
      },
      err => {
        console.log("err ", err);
      }
    );

    Promise.race([
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(100);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(200);
        }, 200);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(100);
        }, 100);
      })
    ]).then(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }, []);

  const clickTestGenerator = useCallback(() => {
    testGenerator();
  },[]);

  const clickTestGeneratorV2 = useCallback(() => {
    testGeneratorV2();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="App-link" onClick={TestPromise}>
          Promise 测试
        </button>
        <button className="App-link" onClick={TestPromiseAll}>
          Promise All 测试
        </button>
        <button className="App-link" onClick={TestPromiseRace}>
          Promise Race 测试
        </button>
        <button className="App-link" onClick={clickTestGenerator}>
          generator 测试
        </button>
        <button className="App-link" onClick={clickTestGeneratorV2}>
          generator 测试 V2
        </button>
      </header>
    </div>
  );
}

export default App;
