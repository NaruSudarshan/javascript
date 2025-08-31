let a = 10
const b = 20
var c = 30

{
    let a = 40
    const b = 50
    var c = 60
    console.log("inside block", a, b, c)   // 40 50 60
}

console.log("outside block", a, b, c)      // 10 20 60
// var is function scoped, so c is changed to 60
// let and const are block scoped, so a and b remain unchanged

// nested scopes

function one(){
    const username = "sudarshan"

    function two(){
        const website = "youtube.com/sudarshan"
        console.log(username) // sudarshan
        console.log(website)  // youtube.com/sudarshan
    }
    console.log(username) // sudarshan
    // console.log(website)  // website is not defined
    two()
}
one()