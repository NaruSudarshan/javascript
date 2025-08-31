let myDate = new Date()
console.log(myDate)                   // current date and time
console.log(myDate.toString())        // current date and time in string format
console.log(myDate.toDateString())    // current date in string format
console.log(myDate.toTimeString())    // current time in string format
console.log(myDate.toISOString())     // current date and time in ISO format
console.log(myDate.toUTCString())

const newDate = new Date(2025,10,5)
console.log(newDate.toString())

let myTimeStamp = Date.now()
console.log(myTimeStamp)              // current timestamp in milliseconds
let myTimeStampDate = new Date("01-01-2023")
