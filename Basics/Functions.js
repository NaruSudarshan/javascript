// *********functions and some methods*********

function sayHello(name = "Guest") { // default parameter
    return `Hello ${name}`
}
console.log(sayHello()) // Hello Guest
console.log(sayHello("Sudarshan")) // Hello Sudarshan

function add(a, b) {
    return a + b
}
console.log(add(2, 3)) // 5

function addAll(...args) { // rest parameter
    let total = 0           
    for (let i = 0; i < args.length; i++) {
        total += args[i]
    }   
    return total
}
console.log(addAll(1, 2, 3, 4, 5)) // 15

// passing array to a function
const myNumbers = [1, 2, 3, 4, 5]
console.log(addAll(...myNumbers)) // 15 - spread operator

// passing object to a function
const myObj = { a: 1, b: 2, c: 3}
function printObj(obj) { // destructuring
    console.log(`a: ${obj.a}, b: ${obj.b}, c: ${obj.c}`)
}   
printObj(myObj) // a: 1, b: 2, c: 3

// function expression
const add2 = function(x, y) { // function expression
    return x + y
}
console.log(add2(2, 3)) // 5

// arrow function
const addArrow = (x, y) => {
    return x + y // explicit return
}

const add3 = (x, y) => x + y //implicit return (x+y) also works
console.log(add3(2, 3)) // 5

// this keyword in functions
const user = {
    name: "Sudarshan",
    age: 24,

    welcomeMessage: function() {
        return `Welcome ${this.name}, age: ${this.age}` // this refers to the object
    }       
}
console.log(user.welcomeMessage()) // Welcome Sudarshan, age: 24

// immediately invoked function expression (IIFE)
// used to create a new scope to avoid global scope pollution and immediately execute the function
(function() {
    console.log("IIFE")
})(); // IIFE

// arrow function IIFE
((name) => {
    console.log(`Arrow IIFE ${name}`)
})('sudarshan') // Arrow IIFE          
