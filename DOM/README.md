# DOM Manipulation

The Document Object Model (DOM) represents the structure of HTML documents as objects that JavaScript can manipulate. This section covers how to select, modify, create, and remove elements from web pages.

## 📁 Files in this Section

- `select.html` - Element selection methods and DOM traversal
- `create.html` - Creating and appending new elements
- `remove_edit.html` - Modifying and removing existing elements

## 🎯 Key Topics Covered

### 1. Element Selection (`select.html`)

#### Basic Selection Methods
```javascript
// Select by ID
const element = document.getElementById('myId');

// Select by class (returns first match)
const element = document.querySelector('.myClass');

// Select all by class (returns NodeList)
const elements = document.querySelectorAll('.myClass');

// Select by tag name
const divs = document.getElementsByTagName('div');

// Select by attribute
const inputs = document.querySelector('input[type="text"]');
```

#### Advanced Selection
```javascript
// CSS selectors
const firstChild = document.querySelector('.parent > :first-child');
const nthChild = document.querySelector('.parent > :nth-child(2)');
const lastChild = document.querySelector('.parent > :last-child');

// Multiple selectors
const elements = document.querySelectorAll('div, p, span');
```

#### DOM Traversal
```javascript
const parent = document.querySelector('.parent');

// Navigate to children
console.log(parent.children);              // HTMLCollection of child elements
console.log(parent.firstElementChild);     // First child element
console.log(parent.lastElementChild);      // Last child element

// Navigate to siblings
const element = document.querySelector('.day');
console.log(element.nextElementSibling);   // Next sibling element
console.log(element.previousElementSibling); // Previous sibling element

// Navigate to parent
console.log(element.parentElement);        // Parent element
```

#### Nodes vs Elements
```javascript
// childNodes includes text nodes and comments
console.log(parent.childNodes);    // NodeList (includes text, comments)

// children only includes element nodes
console.log(parent.children);      // HTMLCollection (elements only)
```

### 2. Element Creation (`create.html`)

#### Creating Elements
```javascript
// Create new element
const div = document.createElement('div');

// Set properties
div.className = 'main';
div.id = Math.round(Math.random() * 10 + 1);
div.setAttribute('title', 'Generated Title');

// Add styles
div.style.backgroundColor = 'green';
div.style.padding = '12px';
```

#### Adding Content
```javascript
// Method 1: innerHTML (can be security risk with user input)
div.innerHTML = '<span>Hello World</span>';

// Method 2: textContent (safe, only text)
div.textContent = 'Hello World';

// Method 3: createTextNode (most secure)
const textNode = document.createTextNode('Hello World');
div.appendChild(textNode);
```

#### Appending to DOM
```javascript
// Append to existing element
document.body.appendChild(div);

// Insert at specific position
parentElement.insertBefore(newElement, existingElement);

// Modern methods (newer browsers)
parentElement.append(div);          // Can append multiple items
parentElement.prepend(div);         // Insert at beginning
parentElement.before(div);          // Insert before element
parentElement.after(div);           // Insert after element
```

### 3. Element Modification and Removal (`remove_edit.html`)

#### Modifying Elements
```javascript
// Change content
element.innerHTML = 'New HTML content';
element.textContent = 'New text content';
element.innerText = 'New visible text';

// Change attributes
element.setAttribute('class', 'new-class');
element.id = 'new-id';
element.className = 'another-class';

// Change styles
element.style.color = 'red';
element.style.fontSize = '20px';
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('highlight');
```

#### Replacing Elements
```javascript
// Replace with new element
const newElement = document.createElement('li');
newElement.textContent = 'Replacement';
oldElement.replaceWith(newElement);

// Replace using outerHTML
element.outerHTML = '<li>New Content</li>';
```

#### Removing Elements
```javascript
// Modern method (preferred)
element.remove();

// Traditional method
element.parentNode.removeChild(element);
```

## 🔧 Practical Examples

### Example 1: Dynamic List Management
```javascript
function addLanguage(langName) {
    const li = document.createElement('li');
    li.textContent = langName;
    document.querySelector('.language').appendChild(li);
}

function addOptimizedLanguage(langName) {
    const li = document.createElement('li');
    const textNode = document.createTextNode(langName);
    li.appendChild(textNode);
    document.querySelector('.language').appendChild(li);
}
```

### Example 2: Element Editing
```javascript
// Edit second item in list
const secondLang = document.querySelector("li:nth-child(2)");
const newli = document.createElement('li');
newli.textContent = "Updated Language";
secondLang.replaceWith(newli);

// Edit using outerHTML
const firstLang = document.querySelector("li:first-child");
firstLang.outerHTML = '<li>TypeScript</li>';
```

### Example 3: Conditional Removal
```javascript
// Remove last item
const lastLang = document.querySelector('li:last-child');
if (lastLang) {
    lastLang.remove();
}
```

## 🛡️ Security Considerations

### innerHTML vs textContent vs innerText
```javascript
// ⚠️ Security Risk: innerHTML with user input
element.innerHTML = userInput; // Can execute scripts!

// ✅ Safe: textContent
element.textContent = userInput; // Only text, no HTML execution

// ✅ Safe: createTextNode
const textNode = document.createTextNode(userInput);
element.appendChild(textNode);
```

### XSS Prevention
```javascript
// ❌ Dangerous
element.innerHTML = `<div>${userInput}</div>`;

// ✅ Safe alternatives
element.textContent = userInput;
// OR
element.innerHTML = `<div>${escapeHtml(userInput)}</div>`;

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## 🎨 Styling and Classes

### Class Manipulation
```javascript
const element = document.querySelector('.my-element');

// Add class
element.classList.add('active');

// Remove class
element.classList.remove('inactive');

// Toggle class
element.classList.toggle('highlight');

// Check if class exists
if (element.classList.contains('active')) {
    // Do something
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

### Style Manipulation
```javascript
// Direct style changes
element.style.backgroundColor = 'blue';
element.style.fontSize = '18px';
element.style.margin = '10px';

// CSS custom properties
element.style.setProperty('--main-color', 'red');

// Get computed styles
const styles = window.getComputedStyle(element);
console.log(styles.color);
```

## 📋 DOM Properties Reference

### Element Properties
```javascript
// Content properties
element.innerHTML       // HTML content
element.textContent     // Text content (including hidden)
element.innerText      // Visible text content only

// Attribute properties
element.id             // Element ID
element.className      // Class attribute as string
element.classList      // Class list (DOMTokenList)

// Style properties
element.style          // Inline styles object

// Relationship properties
element.parentElement  // Parent element
element.children       // Child elements
element.childNodes     // All child nodes (including text)
```

### Useful Methods
```javascript
// Selection methods
document.getElementById()
document.querySelector()
document.querySelectorAll()

// Creation methods
document.createElement()
document.createTextNode()

// Manipulation methods
element.appendChild()
element.removeChild()
element.replaceWith()
element.remove()
element.insertBefore()

// Attribute methods
element.getAttribute()
element.setAttribute()
element.removeAttribute()
element.hasAttribute()
```

## 💡 Best Practices

### Performance Tips
1. **Cache DOM queries**: Store frequently accessed elements in variables
```javascript
// ❌ Bad: Repeated queries
document.querySelector('.list').appendChild(item1);
document.querySelector('.list').appendChild(item2);

// ✅ Good: Cache the element
const list = document.querySelector('.list');
list.appendChild(item1);
list.appendChild(item2);
```

2. **Use DocumentFragment for multiple insertions**
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    li.textContent = items[i];
    fragment.appendChild(li);
}
list.appendChild(fragment); // Single DOM update
```

### Code Organization
1. **Separate concerns**: Keep HTML structure, CSS styling, and JavaScript behavior separate
2. **Use semantic HTML**: Choose appropriate HTML elements for accessibility
3. **Validate elements exist**: Check if elements exist before manipulating them

```javascript
const element = document.querySelector('.my-element');
if (element) {
    element.textContent = 'New content';
}
```

## 🧪 Practice Exercises

### Beginner
1. Create a simple todo list with add/remove functionality
2. Build a dynamic navigation menu
3. Create an image gallery with captions

### Intermediate  
1. Implement drag and drop functionality
2. Build a filterable product list
3. Create a modal dialog system

### Advanced
1. Build a virtual scrolling list
2. Implement a rich text editor
3. Create a component-based system

---

⬅️ [Back to Basics](../Basics/README.md) | ➡️ [Next: Events](../Events/README.md)