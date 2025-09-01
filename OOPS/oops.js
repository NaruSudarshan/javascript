// object literal
const user = {
    username: "sudarshan",
    password: "123",
    signedIn: false,

    getUserDetails: function(){
        return `Username is ${this.username} and password is ${this.password}`
    }
}

console.log(user.username);
console.log(user.getUserDetails());


// constructor function
function User(username,password,signedIn){
    // this to refer to the current object
    this.username = username
    this.password = password
    this.signedIn = signedIn

    return this
}

// creating objects using constructor function (new keyword)
const userTwo = new User("luffy", "123", false)
// user3 is a instance of User
const user3 = new User("zoro", "123", true)

console.log(userTwo);
console.log(user3);