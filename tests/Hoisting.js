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

test('Read Single JSON ', async ({ page }) => {
    console.log("Reading JSON File");
    const strJSON = JSON.stringify(Sample1);
    var jsonObject = JSON.parse(strJSON);
    
    var dataMap = new Map(Object.entries(jsonObject));
    var resultMap = new Map();

    for (const key of dataMap.keys())  {
        let keyV = dataMap.get(key);
        resultMap.set(key, keyV);
    }
    console.log("Map Values stored :: ");
    for (let [key, value] of resultMap) {
        console.log(key + " is " + value);
    }
    console.log("done!");
    // console.log(Sample1)
    // console.log(Sample1.fruit);
    // console.log(Sample1.size);
    // console.log(Sample1.color);
});

test('Read sample2  ', async ({ page }) => {
    
    console.log(Sample2);
    console.log(Sample2.users[1]);
});