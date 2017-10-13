var maxNumber=100;
var primeNumbers=[];
for (let i = 2; i <= maxNumber;i++)
{
    primeNumbers[i]=i;
}
for(let i = 2; i < primeNumbers.length; i++)
{
    let number = primeNumbers[i];
    if(number==0)
    {
        continue;
    }
    for (let index = 2*number; index < primeNumbers.length; index = index + number)
    {
        primeNumbers[index]=0;
    }
}
primeNumbers.shift();//why not? it's only two calls
primeNumbers.shift();
while(primeNumbers.indexOf(0)!=-1)
{
    primeNumbers.splice(primeNumbers.indexOf(0),1);//as you wish splice()
}
console.log(`Простые числа до ${maxNumber}: ${primeNumbers.join(', ')}.`);
//-first n prime numbers-//
var quantity=10;
var firstPrimeNumbers=[2];
let testedNumber=3, numberOfDeviders=0;
while(true)
{
    for(let i=1;i<=testedNumber;i++)
    {
        numberOfDeviders +=(testedNumber % i == 0) ? 1 : 0;
    }
    
    if(numberOfDeviders<=2)
    {
        firstPrimeNumbers.push(testedNumber);
    }
    if (firstPrimeNumbers.length == quantity)
    {
        break;
    }
    testedNumber++;
    numberOfDeviders=0;
}
console.log(`Первые ${quantity} простых чисел: ${firstPrimeNumbers.join(', ')}.`);