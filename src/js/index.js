// 汇总所有js模块
// import '@babel/polyfill'
import {sum} from './module1';
import {sub} from './module2';
import module3 from './module3';
import a from '../json/test.json';
import "../css/index.less";//在入口文件引入样式 不用变量去接受，不用写from


console.log(sum(1, 2));
console.log(sub(3, 2));
console.log(module3.div(4, 2));
console.log(module3.mul(3, 2));
console.log(a, typeof a);

console.log(1);
// alert(2);
console.log("1" == 1);
console.log("1" == 1)
let xx = 2;
xx + 1;


function testPromise(param) {
    return new Promise((resove) => {
        if (param) {

            resove("success");
        }
    });
}

testPromise(true).then((data) => {
    setTimeout(() => {
        console.log(data)
    }, 2000)
}).catch(res => {
    setTimeout(() => {
        console.log(res)
    }, 2000);
});

/*testPromise(false).then((data) => {
    setTimeout(() => {
        console.log(data)
    }, 3000)
}).catch(res => {
    setTimeout(() => {
        console.log(res)
    }, 3000)
});*/
let promise = new Promise();
promise();
//入口文件在哪