interface Person {
    fullName: string;
    age: number;
}
interface Employee{
    employeeId: string;
    position: string;
}
type EmployeePerson = Person & Employee;
const employee: EmployeePerson ={
    fullName: "nguyen van a",
    age:20,
    employeeId:"Ph123",
    position:"manager",
};
console.log(employee);
function priceArray<t>(array: t[]):t[]{
    console.log(array);
    return array;
}
const numberArray: number[]=[1,2,3];
const StringArray: string[]= ["a","b","c"];
priceArray(numberArray);
priceArray(StringArray);

//
interface Iproduct {
    title:string;
}
interface Icategory {
    name: string;
}
interface ApiRes<T>{
    message: string;
    code: number;
    success: boolean;
    data: T;
}
const productRes: ApiRes<Iproduct>={
    message:"OK",
    code:200,
    success: true,
    data:{
        title:"san phan 1",
    },
};

// enum
enum Status {
    Success,
    error,
    loading,
}
console.log(Status.Success);

enum Oder {
    pending = "pending",
    confiner = "CONFINER",
    shipping = "SHIPPING",
}
const Oder: OderStatus ="shipping" as OderStatus;
if (OderStatus == OderStatus.confiner){
    console.log(OderStatus.shipping);
}

enum paymentStatus {
    SUCCESS ="SUCCES",
    FALED="FALED",
}
console.log();
