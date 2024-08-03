//Node.js Crash Course Tutorial #2 - Node.js Basics
const  name= "ninja";
console.log(name);


//  functions-
const greet= (name)=>{
    console.log(`hello, ${name}`);
}


greet('Myname');
greet('yup');


//console.log(global);

setTimeout(()=>{
    console.log("delayed 3 sec, haha")
    clearInterval(int); // runs the setInterval function till a ginve time , here ==3 sec.
},3000);


const int = setInterval(()=>{
    console.log('after every 1  sec, till setTimeout')
},1000);


console.log(__dirname);

// console.log(__filename);