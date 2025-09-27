# JavaScript and Classes - Complete OOP Guide

## Object-Oriented Programming (OOP)
- **Definition**: Programming paradigm based on the concept of "objects"
- **Core Idea**: Organize code around objects rather than functions and logic
- **Benefits**: Code reusability, modularity, easier maintenance, better organization

## Object Fundamentals
- **Collection of properties and methods**
- **Properties**: Variables that belong to an object
- **Methods**: Functions that belong to an object
- **Example**: `"hello".toLowerCase()` - string is object, toLowerCase is method

## Why Use OOP?
1. **Code Reusability**: Write once, use multiple times
2. **Modularity**: Break complex problems into smaller, manageable pieces
3. **Encapsulation**: Keep data and methods together
4. **Maintainability**: Easier to update and debug
5. **Scalability**: Better for large applications

## Parts of OOP in JavaScript

### 1. Object Literal
```javascript
const user = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};
```

### 2. Constructor Functions (Pre-ES6)
```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};
```

### 3. Prototypes
- **Prototype Chain**: How JavaScript implements inheritance
- **Every object has a prototype**: Links objects together
- **Prototype Property**: Functions have prototype property for methods

### 4. ES6 Classes
```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}
```

### 5. Instances
- **Created with `new` keyword**
- **`this` keyword**: Refers to the instance being created
- **Each instance has its own properties**

## The Four Pillars of OOP

### 1. Abstraction
- **Hide complex implementation details**
- **Show only essential features**
- **Example**: Using `car.start()` without knowing engine details

```javascript
class Car {
    #engine; // Private field
    
    start() {
        this.#startEngine(); // Hide complex logic
        return "Car started";
    }
    
    #startEngine() {
        // Complex engine starting logic hidden
    }
}
```

### 2. Encapsulation
- **Bundle data and methods together**
- **Control access to object's internal state**
- **Use private fields/methods to hide implementation**

```javascript
class BankAccount {
    #balance = 0; // Private field
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }
    
    getBalance() {
        return this.#balance; // Controlled access
    }
}
```

### 3. Inheritance
- **Create new classes based on existing ones**
- **Child classes inherit parent properties/methods**
- **Enables code reuse and hierarchy**

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
    speak() {
        return `${this.name} barks`;
    }
}
```

### 4. Polymorphism
- **One interface, multiple implementations**
- **Same method name, different behaviors**
- **Method overriding in inheritance**

```javascript
class Shape {
    calculateArea() {
        throw new Error("Must implement calculateArea");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
}
```

## JavaScript-Specific OOP Features

### Prototype-Based Inheritance
- **Different from class-based languages**
- **Objects can inherit directly from other objects**
- **Prototype chain for method lookup**

### Function Constructors
- **Functions can act as constructors**
- **`new` keyword creates instances**
- **`this` binding in constructor context**

### ES6 Class Sugar
- **Syntactic sugar over prototypes**
- **Cleaner, more familiar syntax**
- **Still prototype-based under the hood**

## Best Practices

### 1. Use Classes for Complex Objects
```javascript
// ✅ Good for multiple instances
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

// ✅ Good for simple, single objects
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};
```

### 2. Favor Composition over Inheritance
```javascript
// ✅ Composition - flexible
class Engine {
    start() { /* engine logic */ }
}

class Car {
    constructor() {
        this.engine = new Engine();
    }
    
    start() {
        this.engine.start();
    }
}
```

### 3. Use Private Fields for Encapsulation
```javascript
class User {
    #password; // Private field
    
    constructor(name, password) {
        this.name = name;
        this.#password = password;
    }
    
    verifyPassword(password) {
        return this.#password === password;
    }
}
```

## Common Patterns

### 1. Factory Pattern
```javascript
function createUser(type, name) {
    if (type === 'admin') {
        return new Admin(name);
    } else if (type === 'user') {
        return new RegularUser(name);
    }
}
```

### 2. Singleton Pattern
```javascript
class Database {
    static instance;
    
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
```

### 3. Observer Pattern
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}
```