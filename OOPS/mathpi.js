const descripter = Object.getOwnPropertyDescriptor(Math, "PI")
//PI value is hardcoded and writable is false so we cannot change its value

// console.log(descripter);

// console.log(Math.PI);
// Math.PI = 5
// console.log(Math.PI);

const chai = {
    name: 'ginger chai',
    price: 250,
    isAvailable: true,

    orderChai: function(){
        console.log("chai nhi bni");
    }
}

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

Object.defineProperty(chai, 'name', {
    writable: false,
    enumerable: false,
    
})

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

// chai.name = "masala chai"

// console.log(chai.name);

for (let [key, value] of Object.entries(chai)) {
    if (typeof value !== 'function') {
        
        console.log(`${key} : ${value}`);
    }
}