// *********objects and some methods*********

// singelton object Object.create()

// object literals

const person = {
    name : "Sudarshan",
    "full name" : "Naru Sudarshan Reddy",
    age  : 24,
    // [mySym] : key1, // for Symbol
    city : "Bangalore"
}

person.name = "sudarshan reddy";
// to access objects
console.log(person.name);
console.log(person["full name"]);

// freeze the object
// Object.freeze(person)

// adding funtion to a object (treat function as variable)
person.greeting = () => {
    console.log("hello")
}
console.log(person.greeting())

person.getName = () => {
    console.log(`my name is ${this.name}`)
}
console.log(person.getName())

// objects can be nested and concatenated 
// const obj3 = Object.assign({},obj1,obj2) // can use spread also


// Objects.keys(person) // returns all keys as array
// Objects.values(person) // returns all values as array

// destructing of objects
const course = {
    courseName : "JavaScript",
    price : 999,
    courseInstructor : "Sudarshan"
}

// course.courseInstructor
const {courseInstructor: instructor} = course
// here we are renaming courseInstructor to instructor
console.log(instructor) // Sudarshan

// json 
// {
//     "name" : "sudarshan",
//     "age" : 24,
//     "city" : "Bangalore"
// }
