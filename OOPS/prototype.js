// prototype behavior in js is it keeps searching for a property in the prototype chain until it finds it or reaches the end of the chain
// every object has a prototype property which points to its prototype object
// inheritance prototype chain
// object -> Object.prototype -> null
// userTwo -> User.prototype -> Object.prototype -> null
// user3 -> User.prototype -> Object.prototype -> null

// let myName = "Sudarshan     "
// let mychannel = "chai     "

// console.log(myName.trueLength);


let myHeros = ["thor", "spiderman"]


let heroPower = {
    thor: "hammer",
    spiderman: "sling",

    getSpiderPower: function(){
        console.log(`Spidy power is ${this.spiderman}`);
    }
}

Object.prototype.Sudarshan = function(){
    console.log(`Sudarshan is present in all objects`);
}

Array.prototype.heySudarshan = function(){
    console.log(`Sudarshan says hello`);
}

// heroPower.Sudarshan()
// myHeros.Sudarshan()
// myHeros.heySudarshan()
// heroPower.heySudarshan()

// inheritance

const User = {
    name: "chai",
    email: "chai@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS assignment',
    fullTime: true,
    __proto__: TeachingSupport
}

Teacher.__proto__ = User

// modern syntax of setting prototype (inheritance)
Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = "ChaiAurCode     "

String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);
}

anotherUsername.trueLength()
"Sudarshan".trueLength()
"iceTea".trueLength()