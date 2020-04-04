const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = []; //成功回调
    self.onRejected = []; //失败回调

    function resolve(value){
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());
        }
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled  === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason};
    let self = this;
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        } else if(self.status === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2,x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
    })
    return promise2;
}

Promise.resolve = function(params){
    if (params instanceof Promise) {
        return params;
    }
    return new Promise((resolve, reject) => {
        if (params && params.then && typeof params.then === 'function') {
            setTimeout(() => {
                params.then(resolve, reject);
            });
        } else {
            resolve(params);
        }
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

Promise.all = function(promises = []) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promises.length === 0) {
            resolve(result);
        } else {
            function processValue(i, data) {
                result[i] = data;
                if (++index === promises.length) {
                    resolve(result);
                }
            }

            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data);
                }, (reason) => {
                    reject(reason);
                    return;
                });
            }
        }
    });
}

Promise.race = function (promises = []){
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return;
        } else {
            for (let index = 0; index < promises.length; index++) {
                Promise.resolve(promises[index]).then((value) => {
                    resolve(value);
                    return;
                }, (reason) => {
                    reject(reason);
                    return;
                })
            }
        }
    });
}


Promise.prototype.catch = function(onRejected){
    return this.then(null, onRejected);
}

Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => {
            return value;
        });
    }, (err) => {
        return Promise.resolve(callback()).then(() => {
            throw err;
        });
    });
}


Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}


function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('循环引用'));
    }
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        let used;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (used) {
                        return;
                    }
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (used) {
                        return;
                    }
                    used = true;
                    reject(r);
                });
            } else {
                if (used) {
                    return;
                }
                used = true;
                resolve(x);
            }
        } catch (error) {
            if (used) {
                return;
            }
            used = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

module.exports = Promise;