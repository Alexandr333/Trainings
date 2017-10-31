let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function nbrbDataRequester()
{
    this._apiList = ['ExRates/Currencies', 'ExRates/Rates?Periodicity=0','ExRates/Rates/130', 'ExRates/Rates/298?onDate=2017-10-1',
    'ExRates/Rates/USD?ParamMode=2'];
    this._baseURI='http://www.nbrb.by/API/';
    this._currentPositionInApiList = -1;
    //
    this._successfullyLoad=(result)=>
    {
        console.log('This is new results\\\\----------------------------------------------\\\\');
        console.log(result+'\n');
        this.MakeConsecutiveRequestsToAPIs();
    }
    //
    this._errorLoad=(error)=>
    {
        console.log('This is new results\\\\----------------------------------------------\\\\');
        console.log(error+'\n');
        this.MakeConsecutiveRequestsToAPIs();
    }
    //
    this.RequestToAPI=(URI)=>
    {
        console.log('Request to ' + URI);

        let xhr = new XMLHttpRequest();
        xhr.open('GET',URI,true);
        xhr.onload=()=>
        {
            if(xhr.status===200)
            {
                this._successfullyLoad(xhr.responseText.slice(0, 100));
            }
            else 
            {
                this._errorLoad('error loading');
            }
        }
        xhr.onerror=()=>
        {
            this._errorLoad('error loading');
        }
        xhr.send();
    }
    //
    this.MakeConsecutiveRequestsToAPIs=()=>
    {
        this._currentPositionInApiList++;
        if (this._currentPositionInApiList === this._apiList.length) 
        {
            this._currentPositionInApiList = -1;
            return;
        }
        
        this.RequestToAPI(this._baseURI+this._apiList[this._currentPositionInApiList]);
    }
    //
}

let dataRequster= new nbrbDataRequester();
console.log('With no using Promises***************************************************************************\n');
dataRequster.MakeConsecutiveRequestsToAPIs();
// setInterval(()=>console.log(111),1000); //as you wish