let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function nbrbDataRequester()
{
    this._apiPatches = ['ExRates/Currencies', 'ExRates/Rates?Periodicity=0','ExRates/Rates/130', 'ExRates/Rates/298?onDate=2017-10-1',
    'ExRates/Rates/USD?ParamMode=2'];
    this._baseURI='http://www.nbrb.by/API/';

    this.RequestToAPI=(URI)=>
    {
        console.log('Request to ' + URI);

        let xhr = new XMLHttpRequest();
        xhr.open('GET',URI,false);
        xhr.onload=()=>
        {
            if(xhr.status===200)
            {
                console.log('This is new results\\\\----------------------------------------------\\\\\n'+xhr.responseText.slice(0,100)+'\n');
            }
            else 
            {
                console.log('error loading'+'\n');
            }
        }
        xhr.onerror=()=>
        {
            console.log('error loading'+'\n');
        }
        xhr.send();
    }
    //
    this.MakeConsecutiveRequestsToAPIs=()=>
    {
        for(let patch of this._apiPatches)
        {
            this.RequestToAPI(this._baseURI+patch);
        }
    }
    //
}

let dataRequster= new nbrbDataRequester();
console.log('With no using Promises***************************************************************************');
dataRequster.MakeConsecutiveRequestsToAPIs();