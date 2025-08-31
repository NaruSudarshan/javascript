const accId = 1234;
let accName = "John Doe";

// dont use var, use let or const because var is scoped to function
var accountBalance = 1000.50;

// const is used for values that should not change
// let is used for values that may change
// var is function-scoped and can be redeclared, but it's generally better to use let or const

console.table({ accId, accName, accountBalance });