let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function nbrbDataRequester()
{   
    this._apiPatches = ['ExRates/Currencies', 'ExRates/Rates?Periodicity=0','ExRates/Rates/130', 'ExRates/Rates/298?onDate=2017-10-1',
    'ExRates/Rates/USD?ParamMode=2'];
    this._baseURI='http://www.nbrb.by/API/';
    this._currentPositionInApiList=-1;
    //
    this._successfullyLoad=(result)=>
    {
        console.log('This is new results\\\\----------------------------------------------\\\\');
        console.log(result+'\n');
    }
    //
    this._errorLoad=(error)=>
    {
        console.log('This is new results\\\\----------------------------------------------\\\\');
        console.log(error+'\n');
    }
    //
    this.getDataFromAPI = function(URI)
    {
        return new Promise(
            (resolve,reject)=>
            {
                console.log('Request to '+URI);

                let xhr = new XMLHttpRequest();

                xhr.open('GET',URI,true);
                xhr.onload=()=>
                {
                    if(xhr.status===200)
                    {
                        resolve(xhr.responseText.slice(0,300));
                    }
                    else
                    {
                        reject('error loading');
                    }
                };
                xhr.onerror=()=>
                {
                    reject('error loading');
                }
                xhr.send();
            }
        );
    }
    //
    this.MakeConsecutiveRequestsToAPIs=()=>
    {
        this._currentPositionInApiList++;
        if (this._currentPositionInApiList === this._apiPatches.length) 
        {
            this._currentPositionInApiList = -1;
            return;
        }
        
        this.getDataFromAPI(this._baseURI + this._apiPatches[this._currentPositionInApiList]).then(
            this._successfullyLoad,
            this._errorLoad
        ).then(
            () => 
            {
                this.MakeConsecutiveRequestsToAPIs();
            }
        );
    }
    //
}

let dataRequster= new nbrbDataRequester();
console.log('With using Promises***************************************************************************\n');
dataRequster.MakeConsecutiveRequestsToAPIs();