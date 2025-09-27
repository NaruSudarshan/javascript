# Object-Oriented Programming in JavaScript

This section covers Object-Oriented Programming (OOP) concepts in JavaScript, from basic object creation to advanced prototype manipulation and ES6 classes.

## 📁 Files in this Section

- `notes.md` - OOP fundamentals and key concepts
- `oops.js` - Object literals and constructor functions
- `Object.js` - Functions as objects and prototype methods
- `prototype.js` - Prototype chain and inheritance
- `call.js` - Function context manipulation with call()
- `Classes.js` - ES6 classes and methods
- `Inheritance.js` - Class inheritance with extends and super
- `getter_setter.js` - ES6 getters and setters in classes
- `object_get_set.js` - Getters and setters in object literals
- `properties_get_set.js` - Property descriptors and Object.defineProperty
- `mathpi.js` - Property descriptors and enumeration
- `staticprop.js` - Static methods in classes
- `bind.html` - Function binding in real-world scenarios

## 🎯 Core OOP Concepts

### The Four Pillars of OOP
1. **Abstraction** - Hiding complex implementation details
2. **Encapsulation** - Bundling data and methods together  
3. **Inheritance** - Creating new classes based on existing ones
4. **Polymorphism** - One interface, multiple implementations

## 🏗️ Object Creation Methods

### 1. Object Literals (`oops.js`)

```javascript
// Simple object literal
const user = {
    username: "sudarshan",
    password: "123", 
    signedIn: false,
    
    // Method using function keyword
    getUserDetails: function() {
        return `Username is ${this.username} and password is ${this.password}`;
    },
    
    // ES6 method syntax
    login() {
        this.signedIn = true;
        return `${this.username} logged in`;
    }
};

console.log(user.getUserDetails());
```

### 2. Constructor Functions (`oops.js`)

```javascript
// Constructor function (before ES6 classes)
function User(username, password, signedIn) {
    this.username = username;
    this.password = password; 
    this.signedIn = signedIn;
    
    // Method (better to add to prototype)
    this.getDetails = function() {
        return `User: ${this.username}`;
    };
    
    return this; // Optional, implicit return
}

// Creating instances with 'new' keyword
const user1 = new User("luffy", "123", false);
const user2 = new User("zoro", "456", true);

console.log(user1.getDetails());
```

#### What happens with the `new` keyword:
1. A new empty object is created
2. The prototype is linked
3. Constructor function is called with `this` bound to new object
4. The new object is returned (unless constructor explicitly returns something else)

### 3. ES6 Classes (`Classes.js`)

```javascript
// Modern class syntax
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    // Instance method
    encryptPassword() {
        return `${this.password}abc`;
    }
    
    // Another instance method
    changeUsername() {
        return `${this.username.toUpperCase()}`;
    }
}

const user = new User("chai", "chai@gmail.com", "123");
console.log(user.encryptPassword()); // "123abc"
console.log(user.changeUsername());  // "CHAI"
```

## 🔗 Prototypes and Inheritance

### 1. Understanding Prototypes (`prototype.js`)

```javascript
// Everything in JavaScript has a prototype chain
// Array -> Array.prototype -> Object.prototype -> null

// Adding methods to built-in prototypes
String.prototype.trueLength = function() {
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);
};

"Sudarshan   ".trueLength(); // Removes whitespace and shows length

// Custom object prototype
Object.prototype.Sudarshan = function() {
    console.log(`Sudarshan is present in all objects`);
};

// This method is now available on all objects
const myArray = ["thor", "spiderman"];
myArray.Sudarshan(); // Works!
```

### 2. Prototype-based Inheritance (`prototype.js`)

```javascript
// Old way: Using __proto__
const User = {
    name: "chai",
    email: "chai@google.com"
};

const Teacher = {
    makeVideo: true,
    __proto__: User  // Inherit from User
};

// Modern way: Object.setPrototypeOf
Object.setPrototypeOf(Teacher, User);

console.log(Teacher.name); // "chai" (inherited)
```

### 3. Constructor Functions with Prototypes (`Object.js`)

```javascript
function CreateUser(username, score) {
    this.username = username;
    this.score = score;
}

// Add methods to prototype (shared among all instances)
CreateUser.prototype.increment = function() {
    this.score++;
};

CreateUser.prototype.printMe = function() {
    console.log(`Score is ${this.score}`);
};

const chai = new CreateUser("chai", 25);
const tea = new CreateUser("tea", 250);

chai.printMe(); // "Score is 25"
chai.increment();
chai.printMe(); // "Score is 26"
```

## 🎭 Function Context and Binding

### 1. The `call` Method (`call.js`)

```javascript
function SetUsername(username) {
    this.username = username;
    console.log("SetUsername called");
}

function CreateUser(username, email, password) {
    // Use call to invoke SetUsername with current context
    SetUsername.call(this, username);
    
    this.email = email;
    this.password = password;
}

const user = new CreateUser("chai", "chai@fb.com", "123");
console.log(user); // Has username, email, and password
```

### 2. The `bind` Method (`bind.html`)

```javascript
class React {
    constructor() {
        this.library = "React";
        this.server = "https://localhost:3000";
        
        // bind ensures 'this' refers to the class instance
        document
            .querySelector('button')
            .addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick() {
        console.log("Button clicked");
        console.log(this.server); // Works because of bind
    }
}

const app = new React();
```

## 🏛️ Class Inheritance

### 1. Class Extension (`Inheritance.js`)

```javascript
// Base class
class User {
    constructor(username) {
        this.username = username;
    }
    
    logMe() {
        console.log(`USERNAME is ${this.username}`);
    }
}

// Derived class
class Teacher extends User {
    constructor(username, email, password) {
        super(username); // Call parent constructor
        this.email = email;
        this.password = password;
    }
    
    addCourse() {
        console.log(`A new course was added by ${this.username}`);
    }
}

const teacher = new Teacher("chai", "chai@teacher.com", "123");
teacher.logMe();    // Inherited method
teacher.addCourse(); // Own method

console.log(teacher instanceof User);    // true
console.log(teacher instanceof Teacher); // true
```

### 2. Static Methods (`staticprop.js`)

```javascript
class User {
    constructor(username) {
        this.username = username;
    }
    
    logMe() {
        console.log(`Username: ${this.username}`);
    }
    
    // Static method - called on class, not instance
    static createId() {
        return `123`;
    }
}

console.log(User.createId()); // Works - called on class

const user = new User("hitesh");
// console.log(user.createId()); // Error - not available on instance

// Static methods are not inherited by default
class Teacher extends User {
    constructor(username, email) {
        super(username);
        this.email = email;
    }
}

// console.log(Teacher.createId()); // Would work
// const teacher = new Teacher("john", "john@email.com");
// console.log(teacher.createId()); // Error
```

## 🔒 Getters and Setters

### 1. Class Getters and Setters (`getter_setter.js`)

```javascript
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    
    // Getter - acts like a property
    get email() {
        return this._email.toUpperCase();
    }
    
    // Setter - called when property is assigned
    set email(value) {
        this._email = value;
    }
    
    get password() {
        return `${this._password}hitesh`;
    }
    
    set password(value) {
        this._password = value;
    }
}

const user = new User("h@hitesh.ai", "abc");
console.log(user.email);    // "H@HITESH.AI"
console.log(user.password); // "abchitesh"
```

### 2. Object Literal Getters/Setters (`object_get_set.js`)

```javascript
const User = {
    _email: 'h@hc.com',
    _password: "abc",
    
    get email() {
        return this._email.toUpperCase();
    },
    
    set email(value) {
        this._email = value;
    }
};

const user = Object.create(User);
console.log(user.email); // "H@HC.COM"
user.email = "new@email.com";
console.log(user.email); // "NEW@EMAIL.COM"
```

### 3. Property Descriptors (`properties_get_set.js`, `mathpi.js`)

```javascript
// Using Object.defineProperty for getters/setters
function User(email, password) {
    this._email = email;
    this._password = password;
    
    Object.defineProperty(this, 'email', {
        get: function() {
            return this._email.toUpperCase();
        },
        set: function(value) {
            this._email = value;
        }
    });
}

// Property descriptor control
const chai = {
    name: 'ginger chai',
    price: 250,
    isAvailable: true
};

// Get property descriptor
console.log(Object.getOwnPropertyDescriptor(chai, "name"));

// Modify property descriptor
Object.defineProperty(chai, 'name', {
    writable: false,    // Cannot be changed
    enumerable: false,  // Won't appear in for...in loops
});

// Now chai.name cannot be modified and won't show in iterations
```

## 🔍 Advanced Concepts

### Understanding `this` Context
```javascript
const obj = {
    name: "Object",
    
    regularFunction: function() {
        console.log(this.name); // "Object" - this refers to obj
    },
    
    arrowFunction: () => {
        console.log(this.name); // undefined - arrow functions don't bind this
    },
    
    nestedExample: function() {
        console.log(this.name); // "Object"
        
        const inner = () => {
            console.log(this.name); // "Object" - inherits this from parent
        };
        inner();
    }
};
```

### Function as Objects (`Object.js`)
```javascript
function multiplyBy5(num) {
    return num * 5;
}

// Functions are objects - can have properties
multiplyBy5.power = 2;

console.log(multiplyBy5(5));        // 25
console.log(multiplyBy5.power);     // 2
console.log(multiplyBy5.prototype); // Function's prototype object
```

## 💡 Best Practices

### 1. Class Design
```javascript
// ✅ Good: Clear, single responsibility
class BankAccount {
    #balance = 0; // Private field (ES2022)
    
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    // Static factory method
    static createSavingsAccount(accountNumber, owner) {
        const account = new BankAccount(accountNumber, owner);
        account.type = 'savings';
        return account;
    }
}
```

### 2. Prototype Pollution Prevention
```javascript
// ❌ Dangerous: Modifying Object.prototype affects all objects
Object.prototype.toString = function() {
    return "Hacked!";
};

// ✅ Better: Create your own prototype chain
function SafeObject() {}
SafeObject.prototype.customMethod = function() {
    return "Safe method";
};
```

### 3. Composition over Inheritance
```javascript
// Instead of deep inheritance chains, use composition
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Wheels {
    roll() {
        console.log("Wheels rolling");
    }
}

class Car {
    constructor() {
        this.engine = new Engine();
        this.wheels = new Wheels();
    }
    
    drive() {
        this.engine.start();
        this.wheels.roll();
        console.log("Car is driving");
    }
}
```

## 🧪 Practice Exercises

### Beginner
1. Create a simple `Person` class with name, age, and methods
2. Implement a `Calculator` class with basic operations
3. Create a `Book` class with getters and setters

### Intermediate
1. Build a `TodoList` class with array manipulation methods
2. Create a `BankAccount` hierarchy with different account types
3. Implement a simple `EventEmitter` class

### Advanced
1. Create a plugin system using prototypes
2. Build a model-view system with observer pattern
3. Implement method chaining (fluent interface)

## 🔧 Debugging OOP Code

### Common Issues and Solutions
```javascript
// Issue: Lost context in callbacks
class Component {
    constructor() {
        this.name = "Component";
    }
    
    // ❌ Problem: 'this' will be undefined in setTimeout
    badMethod() {
        setTimeout(function() {
            console.log(this.name); // undefined
        }, 1000);
    }
    
    // ✅ Solution 1: Arrow function
    goodMethod1() {
        setTimeout(() => {
            console.log(this.name); // "Component"
        }, 1000);
    }
    
    // ✅ Solution 2: Bind
    goodMethod2() {
        setTimeout(function() {
            console.log(this.name); // "Component"
        }.bind(this), 1000);
    }
}
```

---

⬅️ [Back to Events](../Events/README.md) | ➡️ [Next: Promises](../Promises/README.md)