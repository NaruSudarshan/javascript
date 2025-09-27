# JavaScript Complete Study Guide & Revision Notes

This comprehensive guide summarizes all the JavaScript concepts covered in your learning repository. Use this as a quick reference for revision and interview preparation.

## 🎯 Quick Topic Overview

| Section | Key Concepts | | |
|---------|--------------|------------|------------|
| [Basics](#-basics-fundamentals) | Variables, Functions, Arrays, Objects | | |
| [DOM](#-dom-manipulation) | Element selection, creation, modification | | |
| [Events](#-event-handling) | Event listeners, propagation, async concepts | | |
| [OOP](#-object-oriented-programming) | Classes, inheritance, prototypes | | |
| [Promises](#-promises--async) | Async/await, fetch API, error handling | | |
| [Advanced](#-advanced-concepts) | Closures, scope, memory management | | |

## 🏗️ Basics Fundamentals

### Data Types & Variables
```javascript
// Primitive types (Stack memory)
const number = 42;              // Number
const text = "Hello";           // String  
const flag = true;              // Boolean
const empty = null;             // Null
let undefined_var;              // Undefined
const symbol = Symbol('id');    // Symbol
const bigNum = BigInt(123n);    // BigInt

// Reference types (Heap memory)
const array = [1, 2, 3];
const object = { name: "John", age: 30 };
const func = () => console.log("Hello");
```

### Functions - All Syntaxes
```javascript
// Function Declaration (hoisted)
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

// Function Expression
const add = function(a, b) {
    return a + b;
};

// Arrow Functions
const multiply = (a, b) => a * b;
const square = x => x * x;

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("Runs immediately");
})();

// Rest/Spread
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
```

### Arrays - Essential Methods
```javascript
const arr = [1, 2, 3, 4, 5];

// Mutating methods
arr.push(6);        // Add to end
arr.pop();          // Remove from end
arr.unshift(0);     // Add to beginning
arr.shift();        // Remove from beginning
arr.splice(1, 2);   // Remove/insert elements

// Non-mutating methods (return new array)
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((total, num) => total + num, 0);

// Method chaining
const result = arr
    .filter(x => x > 2)
    .map(x => x * 2)
    .reduce((sum, x) => sum + x, 0);
```

### Objects - All Patterns
```javascript
// Object literal
const person = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Destructuring
const { name, age } = person;
const { name: fullName } = person;

// Object methods
Object.keys(person);        // ["name", "age", "greet"]
Object.values(person);      // ["John", 30, function]
Object.entries(person);     // [["name", "John"], ["age", 30]]
Object.assign({}, person);  // Shallow copy
```

## 🌐 DOM Manipulation

### Element Selection
```javascript
// Basic selection
const element = document.getElementById('myId');
const element = document.querySelector('.myClass');
const elements = document.querySelectorAll('.myClass');

// Traversal
const parent = element.parentElement;
const children = element.children;
const nextSibling = element.nextElementSibling;
```

### Element Creation & Modification
```javascript
// Create element
const div = document.createElement('div');
div.className = 'container';
div.id = 'main-content';
div.textContent = 'Hello World';

// Append to DOM
document.body.appendChild(div);

// Modify existing elements
element.innerHTML = '<span>New HTML</span>';
element.textContent = 'New text only';
element.style.color = 'red';
element.classList.add('active');
element.setAttribute('data-id', '123');

// Remove elements
element.remove();
```

## ⚡ Event Handling

### Event Listeners
```javascript
// Basic event handling
element.addEventListener('click', function(event) {
    console.log('Element clicked');
    console.log('Target:', event.target);
    console.log('Mouse position:', event.clientX, event.clientY);
});

// Event delegation (handle dynamic elements)
document.getElementById('parent').addEventListener('click', function(e) {
    if (e.target.classList.contains('child-button')) {
        console.log('Child button clicked');
    }
});

// Prevent defaults
link.addEventListener('click', function(e) {
    e.preventDefault(); // Stop link navigation
    e.stopPropagation(); // Stop event bubbling
});
```

### Timing Functions
```javascript
// setTimeout - execute once after delay
const timeoutId = setTimeout(() => {
    console.log('Executed after 2 seconds');
}, 2000);

clearTimeout(timeoutId); // Cancel timeout

// setInterval - execute repeatedly
const intervalId = setInterval(() => {
    console.log('Every second');
}, 1000);

clearInterval(intervalId); // Stop interval
```

## 🏛️ Object-Oriented Programming

### Object Creation Methods
```javascript
// 1. Object Literal
const user = {
    name: "John",
    greet() { return `Hello ${this.name}`; }
};

// 2. Constructor Function (Old way)
function User(name) {
    this.name = name;
}
User.prototype.greet = function() {
    return `Hello ${this.name}`;
};

// 3. ES6 Classes (Modern way)
class User {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        return `Hello ${this.name}`;
    }
}
```

### Inheritance
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} barks`; // Override parent method
    }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak()); // "Rex barks"
console.log(dog instanceof Animal); // true
```

### Getters, Setters & Static Methods
```javascript
class User {
    constructor(email, password) {
        this._email = email;
        this._password = password;
    }
    
    // Getter
    get email() {
        return this._email.toUpperCase();
    }
    
    // Setter
    set email(value) {
        this._email = value;
    }
    
    // Static method (called on class, not instance)
    static createGuest() {
        return new User('guest@example.com', 'temp123');
    }
}

const user = new User('john@email.com', 'secret');
console.log(user.email); // "JOHN@EMAIL.COM"
const guest = User.createGuest(); // Called on class
```

### Prototypes & Context
```javascript
// Prototype chain
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

"hello".reverse(); // "olleh"

// Function context binding
const obj = {
    name: "Object",
    greet: function() {
        console.log(`Hello from ${this.name}`);
    }
};

// call, apply, bind
obj.greet.call({ name: "Other" }); // "Hello from Other"
const boundGreet = obj.greet.bind({ name: "Bound" });
boundGreet(); // "Hello from Bound"
```

## 🔄 Promises & Async

### Promise Basics
```javascript
// Creating promises
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve({ data: "Success!" });
        } else {
            reject(new Error("Failed!"));
        }
    }, 1000);
});

// Consuming promises
promise
    .then(result => {
        console.log(result.data);
        return "processed";
    })
    .then(processed => {
        console.log(processed);
    })
    .catch(error => {
        console.error(error.message);
    })
    .finally(() => {
        console.log("Promise completed");
    });
```

### Async/Await
```javascript
// Modern async syntax
async function fetchUserData(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}

// Usage
async function main() {
    try {
        const user = await fetchUserData(1);
        console.log(user);
    } catch (error) {
        console.log('Error in main:', error);
    }
}
```

### Promise Utilities
```javascript
// Promise.all - wait for all
const promises = [
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

Promise.all(promises)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => {
        const [users, posts, comments] = data;
        console.log({ users, posts, comments });
    });

// Promise.race - first to complete
Promise.race(promises)
    .then(firstResponse => console.log('First completed'));

// Promise.allSettled - all results regardless of success/failure
Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded`);
            } else {
                console.log(`Promise ${index} failed`);
            }
        });
    });
```

## 🧠 Advanced Concepts

### Closures
```javascript
// Basic closure
function outer() {
    const message = "Hello";
    
    function inner() {
        console.log(message); // Accesses outer variable
    }
    
    return inner; // Return function with its lexical environment
}

const myClosure = outer();
myClosure(); // "Hello" - still has access to message

// Practical closure - data privacy
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount());  // 1
// console.log(counter.count);    // undefined - private
```

### Scope Chain & Execution Context
```javascript
// Global scope
let globalVar = "global";

function outerFunction() {
    // Function scope
    let outerVar = "outer";
    
    function innerFunction() {
        // Inner function scope
        let innerVar = "inner";
        
        console.log(globalVar); // "global" - found in global scope
        console.log(outerVar);  // "outer"  - found in outer scope
        console.log(innerVar);  // "inner"  - found in current scope
    }
    
    innerFunction();
}

outerFunction();
```

## 🛠️ Common Patterns & Best Practices

### Debouncing & Throttling
```javascript
// Debouncing - delay execution until after calls have stopped
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttling - limit execution frequency
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
const debouncedSearch = debounce((query) => {
    console.log('Search:', query);
}, 300);

const throttledScroll = throttle(() => {
    console.log('Scroll handled');
}, 100);
```

### Module Pattern
```javascript
const Module = (function() {
    // Private variables and functions
    let privateVar = 0;
    
    function privateFunction() {
        console.log('Private function called');
    }
    
    // Public API
    return {
        publicMethod() {
            privateVar++;
            privateFunction();
            return privateVar;
        },
        
        getPrivateVar() {
            return privateVar;
        }
    };
})();

console.log(Module.publicMethod()); // 1
console.log(Module.getPrivateVar()); // 1
```

## 🚀 Performance Tips

### Memory Management
```javascript
// ✅ Good: Remove event listeners
function setupComponent() {
    const button = document.getElementById('btn');
    
    function handleClick() {
        console.log('Clicked');
    }
    
    button.addEventListener('click', handleClick);
    
    // Cleanup function
    return function cleanup() {
        button.removeEventListener('click', handleClick);
    };
}

// ✅ Good: Clear timers
const intervalId = setInterval(() => {
    console.log('Running');
}, 1000);

// Clear when done
clearInterval(intervalId);

// ✅ Good: Avoid memory leaks in closures
function createHandler() {
    const largeData = new Array(1000000).fill('data');
    
    return function(specificData) {
        // Don't reference largeData if not needed
        console.log('Processing:', specificData);
    };
}
```

### Efficient DOM Operations
```javascript
// ✅ Good: Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
list.appendChild(fragment); // Single DOM update

// ✅ Good: Cache DOM queries
const container = document.querySelector('.container');
const buttons = container.querySelectorAll('button');
// Use cached references instead of repeated queries
```

## 📋 Interview Quick Reference

### Common Questions & Answers

**Q: What's the difference between `let`, `const`, and `var`?**
- `var`: Function-scoped, hoisted, can be redeclared
- `let`: Block-scoped, hoisted but not initialized, cannot be redeclared
- `const`: Block-scoped, hoisted but not initialized, cannot be reassigned

**Q: Explain closures.**
A closure is when a function has access to variables from its outer scope even after the outer function has returned.

**Q: What's the difference between `==` and `===`?**
- `==`: Loose equality, performs type coercion
- `===`: Strict equality, no type coercion

**Q: How does prototypal inheritance work?**
JavaScript uses prototype chain for inheritance. Objects inherit from other objects through `__proto__` or `Object.setPrototypeOf()`.

**Q: What's the event loop?**
The event loop handles asynchronous operations by moving completed callbacks from the callback queue to the call stack when the stack is empty.

**Happy Coding! 🚀**