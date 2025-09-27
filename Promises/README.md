# Promises & Asynchronous JavaScript

This section covers JavaScript's Promise API and asynchronous programming patterns. Understanding promises is essential for modern JavaScript development, especially when dealing with API calls, file operations, and other asynchronous tasks.

## 📁 Files in this Section

- `Promises.js` - Complete promise implementation with examples

## 🎯 Key Concepts Covered

### 1. Promise Fundamentals

#### What are Promises?
Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner alternative to callback functions for handling asynchronous code.

**Promise States:**
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

#### Creating Promises
```javascript
// Basic Promise creation
const promiseOne = new Promise(function(resolve, reject) {
    // Async task (DB calls, network requests, file operations)
    setTimeout(function() {
        console.log('Async task is complete');
        resolve(); // Mark as fulfilled
    }, 1000);
});

// Consuming the promise
promiseOne.then(function() {
    console.log("Promise consumed");
});
```

#### Promise with Return Values
```javascript
const promiseThree = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // Resolve with data
        resolve({
            username: "Chai", 
            email: "chai@example.com"
        });
    }, 1000);
});

// Access resolved data
promiseThree.then(function(user) {
    console.log(user); // {username: "Chai", email: "chai@example.com"}
});
```

### 2. Error Handling with Promises

#### Promise with Rejection
```javascript
const promiseFour = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true; // Simulate error condition
        
        if (!error) {
            resolve({username: "hitesh", password: "123"});
        } else {
            reject('ERROR: Something went wrong');
        }
    }, 1000);
});
```

#### Promise Chaining with Error Handling
```javascript
promiseFour
    .then((user) => {
        console.log(user);
        return user.username; // Return value for next .then()
    })
    .then((username) => {
        console.log(username); // Receives the returned username
    })
    .catch(function(error) {
        console.log(error); // Handles any rejection
    })
    .finally(() => {
        console.log("The promise is either resolved or rejected");
    });
```

### 3. Async/Await Syntax

#### Modern Promise Consumption
```javascript
const promiseFive = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true;
        if (!error) {
            resolve({username: "javascript", password: "123"});
        } else {
            reject('ERROR: JS went wrong');
        }
    }, 1000);
});

// Using async/await instead of .then()/.catch()
async function consumePromiseFive() {
    try {
        const response = await promiseFive;
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

consumePromiseFive();
```

#### Async Function Best Practices
```javascript
// ✅ Good: Proper error handling
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; // Re-throw if calling code needs to handle it
    }
}
```

### 4. Fetch API and Real-World Examples

#### Basic Fetch Usage
```javascript
// Fetch returns a Promise
fetch('https://api.github.com/users/hiteshchoudhary')
    .then((response) => {
        return response.json(); // This also returns a Promise
    })
    .then((data) => {
        console.log(data); // Actual data
    })
    .catch((error) => {
        console.log('Error:', error);
    });
```

#### Async/Await with Fetch
```javascript
async function getAllUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error:", error);
    }
}

getAllUsers();
```

### 5. Promise.all() and Concurrent Operations

#### Handling Multiple Promises
```javascript
// Promise.all waits for ALL promises to resolve
const promise1 = fetch('/api/data1');
const promise2 = fetch('/api/data2'); 
const promise3 = fetch('/api/data3');

Promise.all([promise1, promise2, promise3])
    .then((responses) => {
        // All responses available
        return Promise.all(responses.map(r => r.json()));
    })
    .then((data) => {
        console.log('All data:', data);
    })
    .catch((error) => {
        // If ANY promise rejects, this catch runs
        console.log('One or more requests failed:', error);
    });
```

#### Other Promise Utility Methods
```javascript
// Promise.allSettled - waits for all, regardless of success/failure
Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`Promise ${index} failed:`, result.reason);
            }
        });
    });

// Promise.race - resolves with first completed promise
Promise.race([promise1, promise2, promise3])
    .then((firstResult) => {
        console.log('First to complete:', firstResult);
    });

// Promise.any - resolves with first successful promise
Promise.any([promise1, promise2, promise3])
    .then((firstSuccess) => {
        console.log('First successful result:', firstSuccess);
    })
    .catch((error) => {
        console.log('All promises failed');
    });
```

## 🔄 Understanding the Event Loop

### Microtask Queue Priority
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0); // Callback queue (macrotask)

Promise.resolve().then(() => console.log('3')); // Microtask queue

console.log('4');

// Output: 1, 4, 3, 2
// Microtasks (Promises) have higher priority than macrotasks (setTimeout)
```

### Detailed Event Loop Example
```javascript
console.log('Start');

// Macrotask (Timer)
setTimeout(() => {
    console.log('setTimeout 1');
}, 0);

// Microtask (Promise)
Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

// Another macrotask
setTimeout(() => {
    console.log('setTimeout 2');
}, 0);

console.log('End');

// Output: Start, End, Promise 1, Promise 2, setTimeout 1, setTimeout 2
```

## 🛠️ Practical Patterns and Examples

### 1. Sequential vs Parallel Execution

#### Sequential (Slower)
```javascript
async function sequentialRequests() {
    console.log('Starting sequential requests...');
    
    const user = await fetch('/api/user/1').then(r => r.json());
    const posts = await fetch('/api/posts/1').then(r => r.json());
    const comments = await fetch('/api/comments/1').then(r => r.json());
    
    return { user, posts, comments };
}
```

#### Parallel (Faster)
```javascript
async function parallelRequests() {
    console.log('Starting parallel requests...');
    
    const [user, posts, comments] = await Promise.all([
        fetch('/api/user/1').then(r => r.json()),
        fetch('/api/posts/1').then(r => r.json()),
        fetch('/api/comments/1').then(r => r.json())
    ]);
    
    return { user, posts, comments };
}
```

### 2. Promise Wrapper Functions
```javascript
// Wrap callback-based APIs in Promises
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Usage
async function example() {
    console.log('Starting...');
    await delay(1000);
    console.log('1 second later');
}

// Promisify Node.js callback functions
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}
```

### 3. Retry Pattern
```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (i === retries) {
                throw error; // Final attempt failed
            }
            console.log(`Attempt ${i + 1} failed, retrying...`);
            await delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}
```

### 4. Timeout Pattern
```javascript
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), ms);
        })
    ]);
}

// Usage
try {
    const data = await withTimeout(
        fetch('/api/slow-endpoint'),
        5000 // 5 second timeout
    );
    console.log(data);
} catch (error) {
    if (error.message === 'Timeout') {
        console.log('Request timed out');
    } else {
        console.log('Other error:', error);
    }
}
```

## 🎯 Advanced Promise Patterns

### 1. Promise Pool (Limiting Concurrency)
```javascript
async function promisePool(tasks, concurrency = 3) {
    const results = [];
    const executing = [];
    
    for (const task of tasks) {
        const promise = task().then(result => {
            executing.splice(executing.indexOf(promise), 1);
            return result;
        });
        
        results.push(promise);
        
        if (results.length >= concurrency) {
            executing.push(promise);
        }
        
        if (executing.length >= concurrency) {
            await Promise.race(executing);
        }
    }
    
    return Promise.all(results);
}
```

### 2. Cache with Promises
```javascript
class PromiseCache {
    constructor() {
        this.cache = new Map();
    }
    
    async get(key, fetcher) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        const promise = fetcher();
        this.cache.set(key, promise);
        
        try {
            const result = await promise;
            return result;
        } catch (error) {
            // Remove failed promises from cache
            this.cache.delete(key);
            throw error;
        }
    }
}

// Usage
const cache = new PromiseCache();

async function getUser(id) {
    return cache.get(`user:${id}`, () => 
        fetch(`/api/users/${id}`).then(r => r.json())
    );
}
```

## 💡 Best Practices

### 1. Error Handling
```javascript
// ✅ Good: Specific error handling
async function robustApiCall() {
    try {
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            } else if (response.status >= 500) {
                throw new Error('Server error');
            } else {
                throw new Error(`Request failed: ${response.status}`);
            }
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error
            console.error('Network error:', error);
        } else {
            // API error
            console.error('API error:', error);
        }
        throw error;
    }
}
```

### 2. Avoiding Common Pitfalls
```javascript
// ❌ Bad: Nested promises (callback hell)
fetch('/api/user')
    .then(response => response.json())
    .then(user => {
        return fetch(`/api/posts/${user.id}`)
            .then(response => response.json())
            .then(posts => {
                return fetch(`/api/comments/${posts[0].id}`)
                    .then(response => response.json());
            });
    });

// ✅ Good: Flat promise chain or async/await
async function fetchUserData() {
    const user = await fetch('/api/user').then(r => r.json());
    const posts = await fetch(`/api/posts/${user.id}`).then(r => r.json());
    const comments = await fetch(`/api/comments/${posts[0].id}`).then(r => r.json());
    
    return { user, posts, comments };
}
```

### 3. Memory Management
```javascript
// ✅ Good: Clean up promise references
class DataManager {
    constructor() {
        this.abortController = new AbortController();
    }
    
    async fetchData(url) {
        try {
            const response = await fetch(url, {
                signal: this.abortController.signal
            });
            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
            } else {
                throw error;
            }
        }
    }
    
    cleanup() {
        this.abortController.abort();
    }
}
```

## 🧪 Practice Exercises

### Beginner
1. Create a function that returns a promise resolving after a delay
2. Build a simple API client with error handling
3. Implement a promise-based timer/stopwatch

### Intermediate
1. Create a promise-based image loader with progress tracking
2. Build a request queue system with concurrency limits
3. Implement promise-based form validation

### Advanced
1. Create a complete HTTP client with caching, retries, and timeouts
2. Build a promise-based state management system
3. Implement async generators for streaming data

## 🔍 Debugging Promises

### Common Issues and Solutions
```javascript
// Issue: Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Issue: Floating promises (missing await)
// ❌ Bad
async function badExample() {
    doSomethingAsync(); // Promise not awaited!
    console.log('This runs immediately');
}

// ✅ Good
async function goodExample() {
    await doSomethingAsync();
    console.log('This runs after completion');
}

// Issue: Mixing callbacks and promises
// ❌ Bad
function mixedApproach(callback) {
    return fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            callback(null, data); // Don't mix!
            return data;
        });
}

// ✅ Good: Choose one pattern
async function promiseOnly() {
    const response = await fetch('/api/data');
    return await response.json();
}
```

---

⬅️ [Back to OOP](../OOPS/README.md) | ➡️ [Next: Misc](../Misc/README.md)