//Promise/A+规定的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._status = PENDING; // Promise的状态
    this._value = undefined; //存储then回调return的值
    this._resolveQueue = []; //成功队列,resolve时触发
    this._rejectQueue = []; //失败队列,reject时触发

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向,否则找不到this._resolveQueue
    let _resolve = (val) => {
      const run = () => {
        // 对应规范:状态只能由pending到fulfilled或者rejected
        if (this._status !== PENDING) {
          return;
        }
        this._status = FULFILLED; //状态变更
        this._value = val; //存储当前value

        // 把then回调放在一个队列来存储，是为了实现对应的规范"then 方法可以被同一个promise调用多次"
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift();
          callback && callback(val);
        }
      };
      // 把resolve执行回调的操作封装成一个函数，放进setTimeout里，以兼容executor是同步代码的情况
      setTimeout(run);
    };

    let _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) {
          return;
        }
        this._status = REJECTED;
        this._value = val;

        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback && callback(val);
        }
      };
      setTimeout(run);
    };

    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject);
  }

  // then方法，接收一个成功的回调和一个失败的回调
  then(resolveFn, rejectFn) {
    // 根据规范, 如果then的参数不是function， 则我们需要忽略它，让链式调用继续往下执行
    resolveFn = typeof resolveFn === "function" ? resolveFn : (value) => value;
    rejectFn =
      typeof rejectFn === "function"
        ? rejectFn
        : (reason) => {
            throw reason;
          };

    // 根据规范 then返回一个新的Promise对象
    const newPromise = new Promise((resolve, reject) => {
      // 把resolve重新包装一下, 再push进resolve的执行队列，这是为了能够获取回调的返回值进行分类处理
      const fulfilledFn = (value) => {
        try {
          // 执行第一个(当前的)Promise的成功回调,并且获取返回值
          let x = resolveFn(value);
          // 分类讨论返回值，如果是Promise,那么等待Promise的状态更改，否则直接resolve
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        // 如果状态为pending时, 把then回调push进resolve/reject的执行队列,等待执行
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        // 当前状态已经是resolve/reject的时候，直接执行then回调
        case FULFILLED:
          setTimeout(() => {
            fulfilledFn(this._value);
          });
          break;
        case REJECTED:
          setTimeout(() => {
            rejectedFn(this._value);
          });
          break;
        default:
          break;
      }
    });

    return newPromise;
  }
}

module.exports = Promise;
