# 1.Subtopic-1
## Assignment

The various data types to be used to build a shopping cart would be:

**a) Number**
The number datatype is extremely crucial in building a shopping cart.
This datatype stores numbers, both integers and floating point values.
Through this datatype, we can set the cost of our products. We can also use this datatype for cost calculation, applying taxes and discounts.

**b) String**
A string in Javascript is a sequence of text characters. It is essential while building a shopping cart as 
we need it to store text-based data like product name, user details etc.

**c) Object**
An object is a complex datatype that stores data in key value pairs. We can represent each product in a shopping cart using an object. 
The details of the producted will be stored in key value pairs and can be accessed easily. This datatype also alllows us to sort out products.

**d) Array**
An array is a special variable used to hold multiple values. We can access each of these values using indexing. 
Multiple products (objects) in our shopping cart can be stored in an array.

## Challenge
**Gotchas** refer to some unexpected behaviours or quirks in Javascript. Some of the **gotchas** that I found are:

**a) Type coercion while doing comparison**
JavaScript's loose equality `==` converts values to comaprable types before conversion. 
So, `console.log(0 == "");`,`console.log(0 == "0");`, `console.log(false == "0"); ` would return the values as `true`.

**b) Issue with NaN**
In JavaScript, NaN stands for Not-a-Number. It is used to represent an undefined or a unpresentable value resulting from invalid mathematics operations suchas dividing by zero. 
But `console.log(NaN === NaN);` will give you the result as `fasle`because as NaN stands for an undefined number, it cannot be reliably compared.

**c) Concatenation**
JavaScript is a dynamically typed language, hence varaiables don't have a fixed data type. It automatically converts one data type to another.
So, `console.log(1+"1")` would give the output as `11`. Here the number 1 is converted to a string. But, if we take any other operator,
for example, subtraction, `console.log(1-"1")` would give the result as 0. This is true for multiplication and division. 
Here, the string 1 is converted to an integer.

# 2.Subtopic-2
## Assignment
### a) Functions that do not return any value

**I.**
```JavaScript
function printSqaure(val=1){
    console.log(`The square of ${val}: `+(val*val));
}
```
**II.**
```JavaScript
function printDetails(name,age=18){
    console.log(`My name is ${name} and I'm ${age} years old`);
}
```

### b) Functions that return a value

**I.**
```JavaScript
function checkPositive(a=0){
    if (a<0){
        return false;
    }
    else if (a>0){
        return true;
    }
    else{
        return "The number is 0";
    }
}
```

**II.**
```JavaScript
function cheeckDivisibility(dividend,divisor=1){
    if (dividend%divisor==0){
        q=dividend/divisor;
        return q;
    else{
        return "Not divisble";
    }
    }
}
```

## Challenge
A method is attached to an object and can only be called using the object's name, while a function can be called independently

# 3.Subtopic-3
## Assignment
```JavaScript
let allStudents = [
  'A',
  'B-',
  1,
  4,
  5,
  2
];

let studentsWhoPass = [];
for(i=0;i<allStudents.length;i++){
    if (allStudents[i]!="C-" || allStudents[i]>=3){
        studentsWhoPass.push(allStudents[i]);
    }
}
console.log(studentsWhoPass);
```
## Challenge
```JavaScript
let x= Number(prompt("Enter a number: "));
if (x%2==0){
    console.log(`${x} is an even number`)
}
else{
    console.log(`${x} is an odd number`)
}
```
Rewriting the code using a ternary expression,
```JavaScript
let x= Number(prompt("Enter a number: "));
let num=(x%2==0)? `${x} is an even number`: `${x} is an odd number`
console.log(num)
```
My prefered syntax is using ternary expression, as I'm able to implement the same logic in fewer lines of code.

# 4.Subtopic-4
## Assignment
```JavaScript
let i=1;
let numarr=[];
for (i=i+3;i<20;i=i+3){
    numarr.push(i);
}
console.log(numarr)
```
## Challenge

**forEach**
```JavaScript
let i=1;
let numarr=[];
for (i=i+3;i<20;i=i+3){
    numarr.push(i);
}
numarr.forEach((e)=>(console.log(e)))
```
