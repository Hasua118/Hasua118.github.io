console.log('Hello world!')
// 1. khai báo biến
let message= "hi";
let number= "10";
console.log(message);
console.log(number)
    let a=10;
    let b=10000
    function sum (a, b){
        return a+b;
    }
    console.log(sum(a,b))
//2. su dung if/else switch/case
// flase~ 0, "", null, undefined, NaN, false
// true~ else
let name= "nguyen hong ha"
if(name.length>15){
    console.log("name too long!", name)
} 
    else{
        console.log("okay!", name)}

let count = 5
switch(count){
    case 1:{
        console.log('count =1 ')
        break
    }
    case 2:{
        console.log('count = 2')
        break
    }
    case 5:{
        console.log('count= 10')
    }
}