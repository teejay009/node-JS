console.log("Hello Word")
console.log(global)


const os = require("os");
const path = require("path")

// const add = (a, b) => a + b
// const subtract = (a, b) => a - b
// const multiply = (a, b) => a * b
// const divide = (a, b) => a / b

const {add,subtract, multiply, divide} = require("./math")
console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
