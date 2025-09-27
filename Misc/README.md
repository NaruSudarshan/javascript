# Miscellaneous JavaScript Concepts

This section covers advanced JavaScript concepts that don't fit neatly into other categories but are essential for understanding how JavaScript works under the hood.

## 📁 Files in this Section

- `closure.html` - Lexical scoping, closures, and practical applications

## 🎯 Key Topics Covered

### 1. Closures (`closure.html`)

#### Understanding Lexical Scope
Lexical scoping means that inner functions have access to variables in their outer scope, determined by where functions are defined, not where they're called.

```javascript
function init() {
    let name = "Mozilla"; // Local variable in init()
    
    function displayName() { // Inner function
        console.log(name); // Uses variable from outer function
    }
    
    displayName();
}
init(); // Outputs: "Mozilla"
```

#### What is a Closure?
A closure gives a function access to its outer scope even after the outer function has returned. It's the combination of a function and the lexical environment in which it was declared.

```javascript
function makeFunc() {
    const name = "Mozilla";
    
    function displayName() {
        console.log(name); // References outer variable
    }
    
    return displayName; // Return the inner function
}

const myFunc = makeFunc();
myFunc(); // Still has access to 'name' even though makeFunc() finished
```

#### How Closures Work
When a function is returned, it carries its lexical environment with it:

```javascript
function outer() {
    let username = "hitesh";
    let secret = "my123";
    
    function inner() {
        console.log("inner", username); // Can access outer variables
    }
    
    function innerTwo() {
        console.log("innerTwo", username);
        console.log(secret);
    }
    
    inner();
    innerTwo();
}
outer();
```

### 2. Practical Closure Applications

#### Event Handlers with Closures
```javascript
function clickHandler(color) {
    // This closure captures the 'color' parameter
    return function() {
        document.body.style.backgroundColor = color;
    };
}

// Each button gets its own closure with different color values
document.getElementById('orange').onclick = clickHandler("orange");
document.getElementById('green').onclick = clickHandler("green");
```

#### Data Privacy with Closures
```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        
        decrement: function() {
            count--;
            return count;
        },
        
        getCount: function() {
            return count; // count is not directly accessible from outside
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// console.log(counter.count); // undefined - private variable
```

#### Module Pattern with Closures
```javascript
const Calculator = (function() {
    let result = 0; // Private variable
    
    function log(message) { // Private function
        console.log(`Calculator: ${message}`);
    }
    
    return {
        add: function(x) {
            result += x;
            log(`Added ${x}, result: ${result}`);
            return this; // Enable chaining
        },
        
        multiply: function(x) {
            result *= x;
            log(`Multiplied by ${x}, result: ${result}`);
            return this;
        },
        
        getResult: function() {
            return result;
        },
        
        reset: function() {
            result = 0;
            log("Reset to 0");
            return this;
        }
    };
})();

// Usage
Calculator.add(5).multiply(2).add(3);
console.log(Calculator.getResult()); // 13
```

### 3. Advanced Closure Patterns

#### Function Factories
```javascript
function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### Memoization with Closures
```javascript
function memoize(fn) {
    const cache = {}; // Closure preserves this cache
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log('Cache hit!');
            return cache[key];
        }
        
        console.log('Computing...');
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// Example: Expensive fibonacci calculation
const fibonacci = memoize(function(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computes and caches
console.log(fibonacci(10)); // Returns from cache
```

#### Partial Application and Currying
```javascript
// Partial application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function add(a, b, c) {
    return a + b + c;
}

const addFiveAndTen = partial(add, 5, 10);
console.log(addFiveAndTen(2)); // 17 (5 + 10 + 2)

// Currying
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### 4. Closure Memory Considerations

#### Memory Leaks with Closures
```javascript
// ⚠️ Potential memory leak
function attachListeners() {
    const hugeData = new Array(1000000).fill('data');
    
    document.getElementById('button').addEventListener('click', function() {
        // This closure keeps hugeData in memory even if we don't use it
        console.log('Button clicked');
    });
}

// ✅ Better approach
function attachListeners() {
    const hugeData = new Array(1000000).fill('data');
    
    function handleClick() {
        console.log('Button clicked');
        // hugeData is not referenced, so it can be garbage collected
    }
    
    document.getElementById('button').addEventListener('click', handleClick);
}
```

#### Proper Cleanup
```javascript
function createWidget() {
    let data = [];
    
    const widget = {
        addData: function(item) {
            data.push(item);
        },
        
        getData: function() {
            return data.slice(); // Return copy to prevent external mutation
        },
        
        cleanup: function() {
            data = null; // Allow garbage collection
        }
    };
    
    return widget;
}
```

### 5. Closures in Loops (Classic Interview Question)

#### The Problem
```javascript
// ❌ Problem: All buttons alert "3"
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Always logs 3
    }, 100);
}
```

#### Solutions
```javascript
// ✅ Solution 1: Use let (block scoping)
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Logs 0, 1, 2
    }, 100);
}

// ✅ Solution 2: IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index); // Logs 0, 1, 2
        }, 100);
    })(i);
}

// ✅ Solution 3: bind
for (var i = 0; i < 3; i++) {
    setTimeout(function(index) {
        console.log(index); // Logs 0, 1, 2
    }.bind(null, i), 100);
}

// ✅ Solution 4: Closure factory
function createLogger(index) {
    return function() {
        console.log(index);
    };
}

for (var i = 0; i < 3; i++) {
    setTimeout(createLogger(i), 100);
}
```

## 🛠️ Real-World Applications

### 1. Debouncing Function
```javascript
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Usage: Limit API calls while user types
const debouncedSearch = debounce(function(query) {
    console.log('Searching for:', query);
    // Make API call here
}, 300);

document.getElementById('search').addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### 2. Throttling Function
```javascript
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Usage: Limit scroll event handling
const throttledScroll = throttle(function() {
    console.log('Scroll event handled');
    // Handle scroll logic here
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### 3. State Management
```javascript
function createStore(initialState) {
    let state = { ...initialState };
    const listeners = [];
    
    return {
        getState() {
            return { ...state }; // Return copy to prevent mutation
        },
        
        setState(newState) {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe(listener) {
            listeners.push(listener);
            
            // Return unsubscribe function
            return function unsubscribe() {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        }
    };
}

// Usage
const store = createStore({ count: 0, name: 'App' });

const unsubscribe = store.subscribe((state) => {
    console.log('State changed:', state);
});

store.setState({ count: 1 }); // Logs: State changed: { count: 1, name: 'App' }
```

### 4. Plugin System
```javascript
function createPluginSystem() {
    const plugins = [];
    
    return {
        register(plugin) {
            if (typeof plugin.init === 'function') {
                plugins.push(plugin);
                plugin.init();
            }
        },
        
        execute(event, data) {
            plugins.forEach(plugin => {
                if (plugin.events && plugin.events[event]) {
                    plugin.events[event](data);
                }
            });
        },
        
        getPlugins() {
            return [...plugins]; // Return copy
        }
    };
}

// Usage
const pluginSystem = createPluginSystem();

const loggerPlugin = {
    init() {
        console.log('Logger plugin initialized');
    },
    
    events: {
        userLogin(data) {
            console.log('User logged in:', data.username);
        },
        
        userLogout(data) {
            console.log('User logged out:', data.username);
        }
    }
};

pluginSystem.register(loggerPlugin);
pluginSystem.execute('userLogin', { username: 'john' });
```

## 💡 Best Practices

### 1. When to Use Closures
✅ **Good use cases:**
- Data privacy and encapsulation
- Function factories and configuration
- Event handlers that need to remember state
- Memoization and caching
- Module patterns

❌ **Avoid closures when:**
- Simple functions don't need persistent state
- Memory usage is critical and closures create unnecessary references
- You can achieve the same with class methods or other patterns

### 2. Performance Considerations
```javascript
// ❌ Creates new function every time (expensive)
function attachHandler() {
    return function(event) {
        console.log('Handle event:', event.type);
    };
}

element.addEventListener('click', attachHandler()); // New function each call

// ✅ Create once, reuse (efficient)
const handleClick = (function() {
    return function(event) {
        console.log('Handle event:', event.type);
    };
})();

element.addEventListener('click', handleClick); // Reuse same function
```

### 3. Debugging Closures
```javascript
// Add debug information to closures
function createDebugClosure(name) {
    let callCount = 0;
    
    function debugFunction(...args) {
        callCount++;
        console.log(`${name} called ${callCount} times with args:`, args);
        
        // Your actual logic here
        return args.reduce((a, b) => a + b, 0);
    }
    
    // Add debugging properties
    debugFunction.getName = () => name;
    debugFunction.getCallCount = () => callCount;
    debugFunction.reset = () => { callCount = 0; };
    
    return debugFunction;
}

const debugAdd = createDebugClosure('addNumbers');
console.log(debugAdd(1, 2, 3)); // Logs debug info and returns 6
```

## 🧪 Practice Exercises

### Beginner
1. Create a simple counter using closures
2. Build a function that remembers previous calculations
3. Implement a simple cache using closures

### Intermediate
1. Create a debounced search function
2. Build a state machine using closures
3. Implement a simple pub/sub system

### Advanced
1. Create a complete module system using closures
2. Build a template engine with closure-based compilation
3. Implement a functional programming library with closures

## 🔍 Common Interview Questions

### Q: What will this code output?
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```
**Answer:** It will log "3" three times because `var` is function-scoped and the loop completes before any timeout executes.

### Q: How do you fix the above code?
**Answer:** Use `let` instead of `var`, or create a closure:
```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Logs 0, 1, 2
}
```

### Q: What's the difference between closure and scope?
**Answer:** Scope determines variable accessibility at write-time, while closure allows functions to access variables from their outer scope even after the outer function has returned.

---

⬅️ [Back to Promises](../Promises/README.md) | 🏠 [Back to Main README](../README.md)