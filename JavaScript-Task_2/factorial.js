var number=10;
var factorialOfNumber=null;
var factorialFactors=[];
for(let i=0;i<=number;i++)
{
    switch(i==0)
    {
        case true:
        {
            factorialFactors[i]=i+1;
            continue;//it's your personaly hell
        }
        case false:
        {
            factorialFactors[i]=i;
            break;
        }
    }
}
factorialOfNumber=factorialFactors[0];
factorialFactors.forEach(
    (item)=>
    {
        factorialOfNumber = factorialOfNumber * item;
    }
)
if(number>0)
{
    console.log(`${number}! = ${factorialFactors.join('*')} = ${factorialOfNumber}`);
}
else
{
    console.log(`${number}! some difficult for calculation, isn't it?`);
}