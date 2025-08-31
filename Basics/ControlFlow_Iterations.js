// if
const isUserLoggedIn = true;
if (isUserLoggedIn) {
    console.log("User is logged in");
}
// < , > , <= , >= , == , === , != , !==

// if - else if - else
const score = 85;
if (score >= 90) {
    console.log("A grade");
} else if (score >= 80) {
    console.log("B grade");
} else if (score >= 70) {
    console.log("C grade");
} else {
    console.log("Fail");
}

// switch
const grade = 'B';
switch (grade) {
    case 'A':
        console.log("Excellent");
        break;
    case 'B':
        console.log("Very Good");
        break;
    case 'C':
        console.log("Good");
        break;
    case 'D':
        console.log("Needs Improvement");
        break;
    default:
        console.log("Invalid grade");
}

// nullish coalescing operator -> safety check for null or undefined
let userName = null;
let defaultName = "Guest";
let finalName = userName ?? defaultName;

// ternary operator
const age = 18;
const canVote = (age >= 18) ? "Yes" : "No";
console.log(`Can vote: ${canVote}`);

// truthy and falsy values
// falsy values: false, 0, -0, "", null, undefined, NaN
// truthy values: all values that are not falsy
    // "0","false," ",[],{},function(){},new Date()
const myVar = 0;
if (myVar) {
    console.log("Truthy");
} else {
    console.log("Falsy");
}   // Falsy
// use double NOT operator to convert to boolean
console.log(!!myVar); // false    

const myVar2 = "Hello";
if (myVar2) {
    console.log("Truthy");
} else {
    console.log("Falsy");
}   // Truthy       
console.log(!!myVar2); // true


// looping statements
// for loop
for (let i = 0; i < 5; i++) {
    console.log(`For loop iteration: ${i}`);
}
// while loop
let j = 0;
while (j < 5) {
    console.log(`While loop iteration: ${j}`);
    j++;
}
// do-while loop
let k = 0;
do {
    console.log(`Do-While loop iteration: ${k}`);
    k++;
} while (k < 5);

// for-in loop (used to iterate over object properties)
const person = {
    name: "Sudarshan",
    age: 24,
    city: "Bangalore"
};
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// for-of loop (used to iterate over iterable objects like arrays, strings, maps, sets)
const myArray = [10, 20, 30, 40, 50];
for (let value of myArray) {
    console.log(`Array value: ${value}`);
}

// forEach loop (array method)
myArray.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
});

