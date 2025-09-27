# Event Handling & Asynchronous JavaScript

This section covers JavaScript's event system, timing functions, and asynchronous programming concepts. Understanding these concepts is crucial for building interactive web applications.

## 📁 Files in this Section

- `basics.html` - Event handling fundamentals, propagation, and delegation
- `setTimeOut.html` - setTimeout functionality and clearing timeouts
- `setInterval.html` - setInterval functionality and clearing intervals  
- `Async..txt` - Notes on synchronous vs asynchronous JavaScript

## 🎯 Key Topics Covered

### 1. Event Handling Basics (`basics.html`)

#### Adding Event Listeners
```javascript
// Method 1: addEventListener (preferred)
element.addEventListener('click', function(event) {
    console.log('Element clicked!');
}, false);

// Method 2: Direct property assignment
element.onclick = function() {
    console.log('Clicked via property');
};

// Method 3: Arrow function
element.addEventListener('click', (e) => {
    console.log('Clicked with arrow function');
});
```

#### Event Object Properties
```javascript
element.addEventListener('click', function(event) {
    console.log('Event type:', event.type);           // 'click'
    console.log('Target element:', event.target);     // Clicked element
    console.log('Current target:', event.currentTarget); // Element with listener
    console.log('Timestamp:', event.timeStamp);       // When event occurred
    console.log('Mouse X:', event.clientX);           // Mouse X coordinate
    console.log('Mouse Y:', event.clientY);           // Mouse Y coordinate
    
    // Keyboard events
    console.log('Key pressed:', event.key);           // Key value
    console.log('Key code:', event.keyCode);          // Key code (deprecated)
    console.log('Alt key:', event.altKey);            // Alt key pressed?
    console.log('Ctrl key:', event.ctrlKey);          // Ctrl key pressed?
    console.log('Shift key:', event.shiftKey);        // Shift key pressed?
});
```

#### Event Prevention
```javascript
// Prevent default behavior
document.querySelector('a').addEventListener('click', function(e) {
    e.preventDefault(); // Prevents link navigation
    console.log('Link click prevented');
});

// Prevent event propagation
// event listeners attached to parent or ancestor elements can also be triggered.
// event.stopPropagation() stops this propagation.
element.addEventListener('click', function(e) {
    e.stopPropagation(); // Stops event bubbling
    console.log('Propagation stopped');
});
```

### 2. Event Propagation (`basics.html`)

#### Bubbling vs Capturing
```javascript
// Bubbling (default): Child to parent
// Bubbling Phase:
// After reaching the target element, the event then bubbles up the DOM tree from the target element back to the window.
document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked');
}, false); // false = bubbling phase

document.getElementById('child').addEventListener('click', function() {
    console.log('Child clicked');
}, false);

// Capturing: Parent to child  
// Capturing Phase:
// The event travels down the DOM tree from the window to the target element where the event occurred.
document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked (capturing)');
}, true); // true = capturing phase
```

#### Event Delegation
```javascript
// Instead of adding listeners to each item, listen on parent
document.querySelector('#images').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Image clicked:', e.target.id);
        
        // Remove the clicked image's parent (li element)
        const listItem = e.target.parentNode;
        listItem.remove();
    }
});
```

### 3. Timing Functions

#### setTimeout (`setTimeOut.html`)
```javascript
// Execute once after delay
const timeoutId = setTimeout(function() {
    console.log('Executed after 2 seconds');
}, 2000);

// setTimeout with parameters
setTimeout(function(name, age) {
    console.log(`Hello ${name}, you are ${age} years old`);
}, 1000, 'John', 25);

// Arrow function syntax
const timeoutId2 = setTimeout(() => {
    console.log('Arrow function timeout');
}, 1500);

// Clear timeout before execution
clearTimeout(timeoutId);
```

#### Practical setTimeout Example
```javascript
const changeText = function() {
    document.querySelector('h1').innerHTML = 'Text Changed!';
};

const changeTimer = setTimeout(changeText, 2000);

// Cancel the timeout when button is clicked
document.querySelector('#stop').addEventListener('click', function() {
    clearTimeout(changeTimer);
    console.log('Timeout cancelled');
});
```

#### setInterval (`setInterval.html`)
```javascript
// Execute repeatedly at intervals
const intervalId = setInterval(function() {
    console.log('Executed every 1 second');
}, 1000);

// setInterval with parameters
const intervalId2 = setInterval(function(message) {
    console.log(message, Date.now());
}, 1000, 'Current time:');

// Clear interval
clearInterval(intervalId);
```

#### Practical setInterval Example
```javascript
let counter = 0;
const counterId = setInterval(function() {
    counter++;
    console.log(`Count: ${counter}`);
    
    // Stop after 10 counts
    if (counter >= 10) {
        clearInterval(counterId);
        console.log('Counter stopped');
    }
}, 1000);
```

### 4. Asynchronous JavaScript Concepts (`Async..txt`)

#### Synchronous vs Asynchronous
```javascript
// Synchronous (blocking)
console.log('Start');
console.log('Middle');
console.log('End');
// Output: Start, Middle, End (in order)

// Asynchronous (non-blocking)
console.log('Start');
setTimeout(() => console.log('Async operation'), 0);
console.log('End');
// Output: Start, End, Async operation
```

#### The Event Loop
JavaScript uses an event loop to handle asynchronous operations:

1. **Call Stack**: Executes synchronous code
2. **Web APIs**: Handle async operations (setTimeout, DOM events, HTTP requests)
3. **Callback Queue**: Holds completed async callbacks
4. **Event Loop**: Moves callbacks from queue to stack when stack is empty

## 🔄 Common Event Types

### Mouse Events
```javascript
element.addEventListener('click', handler);      // Mouse click
element.addEventListener('dblclick', handler);   // Double click
element.addEventListener('mousedown', handler);  // Mouse button pressed
element.addEventListener('mouseup', handler);    // Mouse button released
element.addEventListener('mouseover', handler);  // Mouse enters element
element.addEventListener('mouseout', handler);   // Mouse leaves element
element.addEventListener('mousemove', handler);  // Mouse moves over element
```

### Keyboard Events
```javascript
element.addEventListener('keydown', handler);    // Key pressed down
element.addEventListener('keyup', handler);      // Key released
element.addEventListener('keypress', handler);   // Key pressed (deprecated)

// Example: Handle Enter key
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        console.log('Enter pressed');
    }
});
```

### Form Events
```javascript
form.addEventListener('submit', handler);        // Form submitted
input.addEventListener('change', handler);       // Input value changed
input.addEventListener('input', handler);        // Input value changing
input.addEventListener('focus', handler);        // Element gains focus
input.addEventListener('blur', handler);         // Element loses focus
```

### Window Events
```javascript
window.addEventListener('load', handler);        // Page fully loaded
window.addEventListener('resize', handler);      // Window resized
window.addEventListener('scroll', handler);      // Page scrolled
window.addEventListener('beforeunload', handler); // Before page unload
```

## 🛠️ Practical Patterns

### Debouncing
Limit the rate at which a function can fire (useful for search inputs):

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const debouncedSearch = debounce(function(query) {
    console.log('Searching for:', query);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### Throttling
Limit function execution to once per specified interval:

```javascript
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

// Usage for scroll events
const throttledScroll = throttle(function() {
    console.log('Scroll event handled');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Event Delegation Pattern
Handle events for dynamically created elements:

```javascript
// Parent container
const todoList = document.querySelector('#todo-list');

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        // Handle delete button click
        e.target.closest('.todo-item').remove();
    } else if (e.target.classList.contains('edit-btn')) {
        // Handle edit button click
        editTodoItem(e.target.closest('.todo-item'));
    }
});

// Add new todo items dynamically
function addTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
        <span>${text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);
}
```

## 🎯 Advanced Timing Concepts

### Recursive setTimeout vs setInterval
```javascript
// setInterval - fixed intervals (may accumulate delays)
setInterval(() => {
    // This might queue up if execution takes longer than interval
    heavyOperation();
}, 1000);

// Recursive setTimeout - waits for completion (recommended for heavy operations)
function recursiveTimeout() {
    heavyOperation();
    setTimeout(recursiveTimeout, 1000);
}
recursiveTimeout();
```

### Animation with requestAnimationFrame
```javascript
function animate() {
    // Update animation
    element.style.left = (parseInt(element.style.left || 0) + 1) + 'px';
    
    // Continue animation
    requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
```

## 💡 Best Practices

### Event Handler Management
```javascript
// ✅ Good: Store handler reference for removal
function handleClick() {
    console.log('Clicked');
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// ❌ Bad: Anonymous functions can't be removed
element.addEventListener('click', function() {
    console.log('Cannot remove this');
});
```

### Memory Management
```javascript
// Clean up timers and event listeners
class Component {
    constructor() {
        this.intervalId = setInterval(this.update.bind(this), 1000);
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }
    
    destroy() {
        clearInterval(this.intervalId);
        window.removeEventListener('resize', this.handleResize);
    }
    
    update() {
        console.log('Component updated');
    }
    
    handleResize() {
        console.log('Window resized');
    }
}
```

### Error Handling
```javascript
// Wrap event handlers in try-catch
element.addEventListener('click', function(e) {
    try {
        riskyOperation();
    } catch (error) {
        console.error('Error in click handler:', error);
    }
});

// Handle timer errors
setTimeout(() => {
    try {
        riskyAsyncOperation();
    } catch (error) {
        console.error('Timer error:', error);
    }
}, 1000);
```

## 🧪 Practice Exercises

### Beginner
1. Create a button that changes colors when clicked
2. Build a simple stopwatch with start/stop functionality
3. Implement keyboard navigation for a menu

### Intermediate
1. Create a typing speed test with timer
2. Build an image slideshow with auto-advance
3. Implement form validation with real-time feedback

### Advanced
1. Create a drag-and-drop interface
2. Build a real-time chat interface simulation
3. Implement infinite scroll with throttling

## 🔍 Debugging Tips

### Event Debugging
```javascript
// Log all event details
element.addEventListener('click', function(e) {
    console.log('Event object:', e);
    console.log('Target:', e.target);
    console.log('Current target:', e.currentTarget);
    console.log('Event path:', e.composedPath());
});

// Monitor all events on an element
function logAllEvents(element) {
    const events = ['click', 'mouseover', 'mouseout', 'focus', 'blur'];
    events.forEach(eventType => {
        element.addEventListener(eventType, (e) => {
            console.log(`${eventType} event fired on`, e.target);
        });
    });
}
```

---

⬅️ [Back to DOM](../DOM/README.md) | ➡️ [Next: OOP](../OOPS/README.md)