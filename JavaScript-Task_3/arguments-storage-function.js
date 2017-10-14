function createArgumnetsStorageFunction()
{
    let storage=[];
    return function ()
    {
        if (arguments.length==0)
        {
            return storage;
        }
        storage = storage.concat([].slice.call(arguments));
    }
}
let argumnetsStorageFunction = createArgumnetsStorageFunction();
argumnetsStorageFunction(1,2);
argumnetsStorageFunction('Hello');
argumnetsStorageFunction({a: 1}, 'Some string');
console.log(argumnetsStorageFunction());