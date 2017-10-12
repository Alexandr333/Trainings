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
    for (let index = 2*number; index < primeNumbers.length; index = index + index)
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