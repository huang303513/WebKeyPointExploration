// Promise的三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */
function Promise(executor) {
  let self = this;
  // 默认状态
  self.status = PENDING;
  // 状态从pending变为reject后面的then回调列表
  self.onFulfilled = [];
  // 状态从pending变为reject后面的then回调列表
  self.onRejected = [];

  function resolve(value) {
    self.status = FULFILLED;
    //Promise规范 resolve状态必须要有value
    self.value = value;
    //根据添加顺序调用后面then的resolve回调
    self.onFulfilled.forEach((fn) => fn());
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      // Promise规范 reject状态必须要有reason
      self.reason = reason;
      //根据添加熟悉怒调用后面then的reject回调
      self.onRejected.forEach((fn) => fn());
    }
  }

  try {
    // Promise规范，执行器要立即执行
    executor(resolve, reject);
  } catch (error) {
    resolve(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  let self = this;
  // Promise规范，then必须返回一个Promise对象
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      // 通过setTimeout来模拟Promise规范,
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          // 主要目的处理resolve的不同返回类型的数据，如function,Promise等
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === REJECTED) {
      // 通过setTimeout来模拟Promise规范,
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          // 主要目的处理resolve的不同返回类型的数据，如function,Promise等
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === PENDING) {
      // 把then的回调加入resolve状态
      self.onFulfilled.push(() => {
        // 通过setTimeout来模拟Promise规范,
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            // 主要目的处理resolve的不同返回类型的数据，如function,Promise等
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      // 把then的回调加入reject状态
      self.onRejected.push(() => {
        // 通过setTimeout来模拟Promise规范,
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            // 主要目的处理resolve的不同返回类型的数据，如function,Promise等
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  });
  return promise2;
};

// 主要是处理then返回的不同对象
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("多次调用了"));
    return;
  }
  // Promise是一个有then方法的对象或者是函数, 这里主要处理resolve的回调参数是一个Promise对象
  if ((x && typeof x === "object") || typeof x === "function") {
    let used;
    try {
      // 如果是一个对象，并且有then方法,则递归调用
      let then = x.then;
      if (typeof then === "function") {
        // x 是有then方法的对象
        // y 表示then方法对应的resolve
        // r 表示then方法对应的reject
        then.call(
          x,
          (y) => {
            if (used) {
              return;
            }
            used = true;
            // 递归调用
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (used) {
              return;
            }
            used = true;
            // reject状态调用
            reject(r);
          }
        );
      } else {
        if (used) {
          return;
        }
        used = true;
        // 普通方法直接resolve
        resolve(x);
      }
    } catch (error) {
      if (used) {
        return;
      }
      used = true;
      // 出错了，reject状态调用
      reject(error);
    }
  } else {
    // 基本类型，resolve状态调用
    resolve(x);
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

// Promise.resolve(value) 返回一个以给定值解析后的Promise 对象.
// 如果 value 是个 thenable 对象，返回的promise会“跟随”这个thenable的对象，采用它的最终状态
// 如果传入的value本身就是promise对象，那么Promise.resolve将不做任何修改、原封不动地返回这个promise对象。
// 其他情况，直接返回以该值为成功状态的promise对象。
Promise.resolve = function (param) {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === "function") {
      setTimeout(() => {
        param.then(resolve, reject);
      });
    } else {
      resolve(param);
    }
  });
};

// Promise.reject方法和Promise.resolve不同，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

// Promise.prototype.catch 用于指定出错时的回调，是特殊的then方法，catch之后，可以继续 .then
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// 不管成功还是失败，都会走到finally中,并且finally之后，还可以继续then。并且会将值原封不动的传递给后面的then.
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};

// 如果传入的参数是一个空的可迭代对象，那么此promise对象回调完成(resolve),只有此情况，是同步执行的，其它都是异步返回的。
// 如果传入的参数不包含任何 promise，则返回一个异步完成.
// promises 中所有的promise都promise都“完成”时或参数中不包含 promise 时回调完成。
// 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败
// 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    }

    function processValue(i, value) {
      result[i] = value;
      if (++index === promises.length) {
        resolve(result);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (data) => {
          processValue(i, data);
        },
        (reason) => {
          reject(reason);
          return;
        }
      );
    }
  });
};

// Promise.race函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
// 如果传的参数数组是空，则返回的 promise 将永远等待。
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    }
    let hasUsed = false;
    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(promises[index]).then(
        (value) => {
          if (!hasUsed) {
            hasUsed = true;
            resolve(value);
          }
          return;
        },
        (reason) => {
          if (!hasUsed) {
            hasUsed = true;
            reject(reason);
          }
          return;
        }
      );
    }
  });
};

module.exports = Promise;
