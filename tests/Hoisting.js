// Memory creation
// Thread of Execution

// Before, thread of execution, memory is created or stored, it is called hoisting in Javascript.

// Call Stack 
//Memory allocation
// Some stack structure is "Global Execution Context[GEC]
// function directly stores in memory at whole as unit
// in case of variables, value is not attached in memory allocation, rather it remains undefined.

//Thread of Execution:
// o/p : 

//let and const comes in ES6[before 2017]

//execute i using let as let value is under temporal dead zone, until initialized with values, it remains unaccessible

function sagar(){
    console.log(i)
    //console.log(k)
    //console.log(l)
    function sunar(){
        let i=0;
        var k=10;
        const l = 'sagar';
    };
}

sagar()
//sayHello();
console.log(i);
// a=10;
// let a
// console.log(a)
/*
function sayHello(){
    console.log("Hello");
}
*/
var sayHello = function(){
    console.log("Hello");
}

sayHello();
//var i = 10;
