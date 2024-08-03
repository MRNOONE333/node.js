const xyz = require('./3people');
//or
const {people ,age} = require('./3people');


console.log(xyz);
console.log(xyz.people);

//or
console.log('other way----')
console.log(people,age);



//
const os = require('os');
console.log(os.platform(), os.homedir())