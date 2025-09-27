# JavaScript Basics

This section covers the fundamental concepts of JavaScript programming. These are the building blocks that you'll use throughout your JavaScript journey.

## 📁 Files in this Section

- `DataTypes.js` - Data types, variables, and memory management
- `LetConstVar.js` - Variable declarations and scoping
- `Functions.js` - Function syntax, parameters, and arrow functions
- `ControlFlow_Iterations.js` - Conditionals, loops, and control structures
- `Arrays.js` - Array methods and manipulation
- `Objects.js` - Object creation, methods, and destructuring
- `Scopes.js` - Block scope, function scope, and lexical scoping
- `DateAndTime.js` - Date object and time manipulation
- `notes.js` - JavaScript execution context concepts

## 🎯 Key Topics Covered

### 1. Variables and Data Types (`DataTypes.js`, `LetConstVar.js`)

#### Primitive Data Types
```javascript
// 7 primitive types
let number = 42;              // Number
let text = "Hello";           // String
let isActive = true;          // Boolean
let nothing = null;           // Null
let notDefined;               // Undefined
let unique = Symbol("id");    // Symbol
let bigNum = BigInt(123n);    // BigInt
```

#### Variable Declarations
```javascript
const PI = 3.14159;           // Cannot be reassigned
let count = 0;                // Can be reassigned, block-scoped
var oldStyle = "avoid";       // Function-scoped, avoid using
```

#### Memory Management
- **Stack**: Stores primitive types (pass by value)
- **Heap**: Stores objects and arrays (pass by reference)

### 2. Functions (`Functions.js`)

#### Function Declaration vs Expression
```javascript
// Function Declaration (hoisted)
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

// Function Expression (not hoisted)
const add = function(a, b) {
    return a + b;
};

// Arrow Function (modern syntax)
const multiply = (a, b) => a * b;
```

#### Advanced Function Concepts
```javascript
// Rest Parameters -> collects all remaining arguments into an array
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("Runs immediately!");
})();

// Arrow IIFE with parameters
((name) => {
    console.log(`Hello ${name}`);
})("World");
```

### 3. Control Flow (`ControlFlow_Iterations.js`)

#### Conditional Statements
```javascript
// If-else chain
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}

// Ternary operator
const status = age >= 18 ? "Adult" : "Minor";

// Nullish coalescing -> returns right side if left is null or undefined
const name = username ?? "Guest";
```

#### Loops and Iteration
```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For-of (values)
for (const item of array) {
    console.log(item);
}

// For-in (keys/indices)
for (const key in object) {
    console.log(key, object[key]);
}

// forEach (array method)
array.forEach((item, index) => {
    console.log(index, item);
});
```

### 4. Arrays (`Arrays.js`)

#### Array Creation and Basic Operations
```javascript
const fruits = ["apple", "banana", "orange"];
const numbers = new Array(1, 2, 3, 4, 5);

// Adding elements
fruits.push("grape");         // Add to end
fruits.unshift("mango");      // Add to beginning

// Removing elements
fruits.pop();                 // Remove from end
fruits.shift();               // Remove from beginning
```

#### Higher-Order Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter: Create new array with elements that pass test
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Map: Transform each element
const doubled = numbers.map(num => num * 2);

// Reduce: Reduce array to single value
const sum = numbers.reduce((total, num) => total + num, 0);

// Method chaining
const result = numbers
    .filter(num => num > 5)
    .map(num => num * 2)
    .reduce((sum, num) => sum + num, 0);
```

### 5. Objects (`Objects.js`)

#### Object Creation and Access
```javascript
// Object literal
const person = {
    name: "John",
    age: 30,
    city: "New York",
    "full name": "John Doe",    // Key with spaces
    
    // Method
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Accessing properties
console.log(person.name);           // Dot notation
console.log(person["full name"]);   // Bracket notation
```

#### Object Destructuring
```javascript
const { name, age } = person;       // Extract properties
const { name: fullName } = person;  // Rename during extraction

// Nested destructuring
const { address: { city } } = user;
```

#### Object Methods
```javascript
Object.keys(person);        // Array of keys
Object.values(person);      // Array of values
Object.entries(person);     // Array of [key, value] pairs
Object.assign({}, obj1, obj2); // Merge objects
```

### 6. Scope and Context (`Scopes.js`)

#### Block vs Function Scope
```javascript
// Block scope (let, const)
{
    let blockScoped = "only here";
    const alsoBlocked = "me too";
}
// console.log(blockScoped); // ReferenceError

// Function scope (var)
function example() {
    if (true) {
        var functionScoped = "accessible throughout function";
    }
    console.log(functionScoped); // Works!
}
```

#### Lexical Scoping
```javascript
function outer() {
    const outerVar = "I'm outer";
    
    function inner() {
        console.log(outerVar); // Can access outer scope
    }
    
    inner();
}
```

### 7. Execution Context (`notes.js`)

#### How JavaScript Executes Code
1. **Memory Creation Phase**
   - Variables are allocated memory
   - Functions are stored completely
   - Variables get `undefined` initially

2. **Code Execution Phase**
   - Variables are assigned values
   - Functions are executed

#### Call Stack
- LIFO (Last In, First Out) structure
- Global execution context at bottom
- Function contexts pushed/popped as functions are called/returned

## 🔄 Common Patterns and Best Practices

### Variable Declaration
```javascript
// ✅ Good
const API_URL = "https://api.example.com";  // Constants in UPPER_CASE
let userCount = 0;                          // Use let for variables that change
const users = [];                           // Use const for objects/arrays

// ❌ Avoid
var globalVar = "problematic";              // Avoid var
```

### Function Best Practices
```javascript
// ✅ Good: Pure functions
const calculateTax = (amount, rate) => amount * rate;

// ✅ Good: Default parameters
const greetUser = (name = "Guest") => `Hello, ${name}!`;

// ✅ Good: Early returns
function validateUser(user) {
    if (!user) return false;
    if (!user.email) return false;
    return true;
}
```

### Array Operations
```javascript
// ✅ Good: Use appropriate methods
const activeUsers = users.filter(user => user.isActive);
const userNames = users.map(user => user.name);

// ✅ Good: Check array length
if (array.length > 0) {
    // Process array
}

// ✅ Good: Use includes for checking existence
if (fruits.includes("apple")) {
    // Do something
}
```

## 🧪 Practice Exercises

### Beginner Level
1. Create a function that takes an array of numbers and returns the sum
2. Write a function to find the largest number in an array
3. Create an object representing a book with properties and methods
4. Use array methods to filter and transform data

### Intermediate Level
1. Implement a simple calculator using functions
2. Create a user validation system with multiple checks
3. Build a shopping cart with add/remove functionality
4. Use closures to create a counter function

## 💡 Important Concepts to Remember

### Truthy and Falsy Values
```javascript
// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

if (value) {
    // Runs if value is truthy
}

// Double negation to convert to boolean
const isTrue = !!value;
```

### Type Coercion
```javascript
"5" + 3        // "53" (string concatenation)
"5" - 3        // 2 (numeric subtraction)
"5" == 5       // true (loose equality)
"5" === 5      // false (strict equality)
```

### Common Gotchas
1. **Hoisting**: Functions are hoisted completely, `var` variables are hoisted but undefined
2. **Reference vs Value**: Objects are passed by reference
3. **Array mutations**: `push()`, `pop()` modify original array; `map()`, `filter()` create new arrays

---

⬅️ [Back to Main README](../README.md) | ➡️ [Next: DOM Manipulation](../DOM/README.md)