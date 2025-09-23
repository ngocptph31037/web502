// Bài 1:
let number1: number = 5;
let number2: number = 2.8;
let phrase: string = 'Result is ';
let permit: boolean = true;

const result = number1 + number2;
if (permit) {
  console.log(phrase + result);
} else {
  console.log('Not show result');
}

// Bài 2
function add(x = 5) {
  let phrase = 'Result is ';
  let x = '2.8';
  return phrase + x;
}
let result2: number = add(); 

// Bài 3: 
var person: {
  name: string;
  age: number;
};
person = {
  name: "Typescript",
  age: 11
};
console.log(person.name);

// Bài 4: 
enum Role { ADMIN, READ_ONLY, AUTHOR }

const person2 = {
  name: 'Nam',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
  roleTuple: [0, 'admin']
};

console.log(person2.name);

let favouriteActivities: any[];
favouriteActivities = ['Sports', 1];

if (person2.role === Role.AUTHOR) {
  console.log('is author');
}

person2.roleTuple.push('admin');
person2.roleTuple[1] = 10;    
person2.roleTuple = [0, 'admin', 'user']; 

// Bài 5: 
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Typescript';
if (typeof userInput === 'string') {
  userName = userInput;
}
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Typescript Vs ', 'Javascript', 'as-text');
console.log(combinedNames);

// Bài 7: 
var a = null;
console.log(a);
console.log(typeof a);

var b;
console.log(b);
console.log(typeof b);

console.log(typeof undeclaredVar); 