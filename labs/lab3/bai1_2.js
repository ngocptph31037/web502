"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumFunction() {
    return 10 + 20;
}
const sumArrow = () => 30 + 40;
console.log("Sum Function:", sumFunction());
console.log("Sum Arrow:", sumArrow());
let sum = (x = 5, y, ...rest) => {
    let total = x + (y ?? 0);
    rest.forEach(n => total += n);
    return total;
};
console.log("Sum Default:", sum());
console.log("Sum Optional:", sum(8));
console.log("Sum Rest:", sum(1, 2, 3, 4, 5));
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
console.log("Active Hobbies:", activeHobbies);
let sum2 = (x = 5, y) => {
    return x + y;
};
let speech = (output) => {
    console.log("Result: " + output);
};
speech(sum2(5, 12));
console.log(speech(sum2(8, 5)));
let something = undefined;
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
function AddandHandle(x, y, cb) {
    const result = x + y;
    cb(result);
}
AddandHandle(10, 20, (result) => {
    console.log("Callback result:", result);
});
//# sourceMappingURL=bai1_2.js.map