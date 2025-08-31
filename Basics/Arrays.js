// *********Array and some methods*********
const myArr = [1, 2, 3, 4, 5]
const myArr1 = new Array(1, 2, 3, 4, 5)
console.log(myArr.length)           // 5
console.log(Array.isArray(myArr))   // true
console.log(myArr[0])               // 1
myArr.push(6)                       // [ 1, 2, 3, 4, 5, 6 ]
myArr.pop()                      // [ 1, 2, 3, 4, 5 ]
myArr.unshift(0)                    // [ 0, 1, 2, 3, 4, 5 ]
myArr.shift()                       // [ 1, 2, 3, 4, 5 ]
console.log(myArr.indexOf(3))       // 2
console.log(myArr.reverse())        // [ 5, 4, 3, 2, 1 ]

// differece between splice and slice
// splice - modifies the original array, used to add/remove elements
// slice - does not modify the original array, used to extract a portion of the array

const joinedArr = myArr.join('') // '12345'

// concat - used to merge two or more arrays
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = arr1.concat(arr2) // [ 1, 2, 3, 4, 5, 6 ]

// spread operator - used to expand an array into individual elements
const arr4 = [...arr1, ...arr2] // [ 1, 2, 3, 4, 5, 6 ]     

Array.from('hello') // [ 'h', 'e', 'l', 'l', 'o' ]

Array.of(1, 2, 3) // [ 1, 2, 3 ]


const myNums = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10]

// filter - creates a new array with all elements that pass the test implemented by the provided function
const filterNums = myNums.filter((num) => num % 2 === 0) // [ 2, 4, 6, 8, 10 ] 

// map - creates a new array with the results of calling a provided function on every element in the calling array
const mapNums = myNums.map((num) => num * 2) // [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]

// reduce - executes a reducer function (that you provide) on each element of the array, resulting in a single output value
const reduceNums = myNums.reduce((accumulator, currentValue) => accumulator + currentValue, 0) // 0 is the initial value of accumulator

// nested map and filter
const multipleMapFilter = myNums
    .map((num) => num * 2)           // [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]
    .filter((num) => num % 3 === 0)  // [ 6, 12, 18 ]
    .reduce((acc, curr) => acc + curr, 0) // 36
console.log(multipleMapFilter) // 36     