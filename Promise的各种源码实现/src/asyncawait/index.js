const Promise = require("../promise");

function *myGenerator() {
    console.warn(yield Promise.resolve(1));
    console.warn(yield Promise.resolve(2));
    console.warn(yield Promise.resolve(3));
}

function run(gen) {
    var g = gen();
    function step(val) {
        var res = g.next(val);
        if (res.done) {
            return res.value;
        }
        res.value.then((val) => {
            step(val);
        })
    }
    step();
}

export function testGenerator() {
    run(myGenerator);
};


function *myGeneratorV2() {
    try {
       const result = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(2);
            },3000);
        });
        return result;
    } catch (error) {
        console.warn(error);
    }
}

function runV2(gen) {
    return new Promise((resolve, reject) => {
        var g = gen();
        function step(val){
            let res;
            try {
                res = g.next(val);
            } catch (error) {
                return reject(error);
            }
            if (res.done) {
                return resolve(res.value)
            }
            Promise.resolve(res.value).then((val) => {
                step(val);
            }, (err) => {
                g.throw(err);
            });
        }

        step();
    });
}

export function testGeneratorV2() {
    console.warn('====before=====');
    const result = runV2(myGeneratorV2).then((i1) => {
        console.warn('i1=====>' + i1);
    }, (j1) => {
        console.warn('j1=====>' + j1);
    });
    console.warn('after=====>' + result);
};


export default {
    testGenerator,
    testGeneratorV2,
};