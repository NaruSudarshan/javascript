"use strict" // treat all JS code as modern

// Data Types

// based on how the data is stored in memory

// primitive data types
// 7 types: number, string, boolean, null, undefined, symbol, BigInt
const accId = 1234; // number (integer)
let accName = "John Doe"; // string
let isAccActive = true; // boolean
let accBalance = 1000.50; // number (float)
let accAddress; // undefined
let accPhone = null; // null is a object   
let accSymbol = Symbol("id"); // symbol
// symbols are unique and immutable, often used to identify object properties
// BigInt - used for very large integers
const bigIntNum = BigInt(1234567890123456789012345678901234567890); // BigInt
console.log(typeof accId);  
console.log(typeof accPhone)        // number


// (reference) non-primitive: 
// arrays, functions, objects

// object (key-value pairs) - used to store multiple values in a single variable
let account = {
    id: accId,      
    name: accName,
    isActive: isAccActive,
    balance: accBalance,
    address: accAddress,
    phone: accPhone,
    symbol: accSymbol
};
console.table(account);

// array - used to store multiple values in a single variable
const heros = ["Super", "Bat", "Wonder"];

// function - a block of code designed to perform a particular task
function greet() {
    console.log("Hello, welcome to the bank!");
}



// data type conversions
let score = 33;
let scoreStr = String(score);
console.log(typeof scoreStr);      // string

let num = "33abc"
let num1 = Number(num);  // NaN - Not a Number
console.log(num1);                 // NaN
console.log(typeof num1);          // number

// *********operators*********

let x = 10
let negX = -x

console.log("1" + 2)
console.log(1 + "2")
console.log("1" + "2")
console.log(1 + 2)  
console.log("1" + 2 + 2)
console.log(1 + 2 + "2")

// **********comparisons**********
// === strict equality operator - checks value and type
console.log(1 === 1)        // true
console.log(1 === '1')      // false

// **********stack vs heap memory**********
// primitive types are stored in stack memory
// non-primitive types are stored in heap memory
// heap memory is referenced by stack memory
// heap stores the actual object, array, function
// stack stores the reference to the heap memory

// we get copy of primitive types in stack memory

let score1 = 100
let score2 = score1
score2 = 200
console.log(score1)       // 100        
console.log(score2)       // 200

// we get reference of non-primitive types in stack memory
let user1 = { name: "John", age: 30 }
let user2 = user1
user2.age = 31
console.log(user1)        // { name: 'John', age: 31 }
console.log(user2)        // { name: 'John', age: 31 }  
// both user1 and user2 point to the same object in heap memory
// changing user2 also changes user1




// ********Strings and some methods********
const myName = "sudarshan"
console.log(`Hello my name is ${myName}`) 
const newName = new String("sudarshan")

// methods
console.log(myName.toUpperCase())        // SUDARSHAN
console.log(myName.charAt(0))           // s
console.log(myName.indexOf('a'))        // 4
console.log(myName.lastIndexOf('a'))    // 7

const newName1 = myName.substring(0, 4)
console.log(newName1)                    // sudar
// difference between slice and substring is that slice can accept negative indices
const newName2 = myName.slice(0, 4) // 0 -> 4 (4 not included)
console.log(newName2)                    // sudar

const newName3 = myName.trim() // removes whitespace from both ends

const replaceName = myName.replace('s', 'S')





// *********Number and math *********
const myNum = 123.45678
const myNum1 = new Number(123.45678)

console.log(myNum.toFixed(2))        // 123.46
console.log(myNum1.toString())      // "123.45678"
console.log(Number.isInteger(myNum))  // false

const hundreds = 1000000000
console.log(hundreds.toLocaleString("en-IN"))   // 1,00,00,00,000

console.log(Math.random())        // random number between 0 and 1
console.log(Math.floor(Math.random() * 10) + 1) // random number between 1 and 10
// Math.floor() - rounds down to nearest integer
// Math.ceil() - rounds up to nearest integer
// Math.round() - rounds to nearest integer
// Math.trunc() - removes decimal part


const min = 10
const max = 20
const randNum = Math.floor(Math.random() * (max - min + 1)) + min // random number between min and max (inclusive)
console.log(randNum)





