function sumFunction(): number {
    return 10 + 20;
}
const sumArrow = (): number => 30 + 40;

console.log("Sum Function:", sumFunction());
console.log("Sum Arrow:", sumArrow());

let sum = (x: number = 5, y?: number, ...rest: number[]): number => {
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

let sum2 = (x: number = 5, y: number): number => {
    return x + y;
}
let speech = (output: any): void => {
    console.log("Result: " + output);
}

speech(sum2(5, 12));
console.log(speech(sum2(8, 5)));

let something: void = undefined;
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

function AddandHandle(x: number, y: number, cb: (num: number) => void) {
    const result = x + y;
    cb(result);
}
AddandHandle(10, 20, (result) => {
    console.log("Callback result:", result);
});
