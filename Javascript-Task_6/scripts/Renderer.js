//#region class Renderer
function Renderer()
{
    this._htmlParser=new HTMLStringsParser();
    this._localScope={};
    
    this._forCycleParamsRegExp=new RegExp(/ renderFor\(([^ ]*) in (.*?)\)/);
    this._forCyclePattern='renderFor([^)]{5,})';
    this._propertiesScopePropertyChainsRegExp=/\{\{\{([^\}]*)\}\}\}/g;
    this._forCyclePropertyChainsRegExp=/\[\[([^\]]*)\]\]/g;
    this._propertySeparatorPattern='\.';
}
Renderer.prototype.parseFromString=function(text,propertiesScope)
{
    text=this.parseCycles(text,propertiesScope);
    text=this.parsePropertyChains(text,this._propertiesScopePropertyChainsRegExp,this._propertySeparatorPattern='\.',propertiesScope);
    return text;
}
Renderer.prototype.renderInElement=function(text,element)
{
    element.innerHTML(text);
}
Renderer.prototype.parseCycles=function(text,propertiesScope)
{
    let tagInfo=this._htmlParser.selectTagFromString(text,this._forCyclePattern,0); 
    let startIndex=tagInfo.startIndex;
    let length=0;
    let parseResult;
    while(tagInfo)
    {
        startIndex=tagInfo.startIndex;
        length=tagInfo.getFullTag().length;

        parseResult=this.parseCycle(tagInfo,propertiesScope);
        text=this.stringReplace(text,startIndex,length,parseResult);
        tagInfo=this._htmlParser.selectTagFromString(text,this._forCyclePattern,startIndex);
    }
    return text;
}
Renderer.prototype.parseCycle=function(selectedTagInfo,propertiesScope)
{
    let ForCycleParams=this.getForCycleParams(selectedTagInfo.openingTag,propertiesScope);
    selectedTagInfo.openingTag=selectedTagInfo.openingTag.replace(this._forCycleParamsRegExp,'');
    let tag=selectedTagInfo.getFullTag();
    let result='';
    for(let i in ForCycleParams.iterableObject)
    {
        this._localScope[ForCycleParams.variableName]=i;
        tag = this.parsePropertyChains(tag, this._forCyclePropertyChainsRegExp, this._propertySeparatorPattern, this._localScope);
        result+='\n'+tag+'\n';
        tag=selectedTagInfo.getFullTag();
    }
    delete this._localScope[ForCycleParams.variableName];
    return result;
}
Renderer.prototype.parsePropertyChains=function(string,regExp,separatorPattern,propertiesScope)
{
    string=string.replace(regExp,
        (regExpMatch,propertyChainString)=>
        {
            let result=this.getPropertyChainValue(propertyChainString,propertiesScope,separatorPattern);
            if(result===null || result===undefined)
            {
                result=regExpMatch;
            }
            return result;
        }
    );
    return string;
}
Renderer.prototype.getPropertyChainValue=function(propertyChainString,propertiesScope,separatorPattern)
{
    let propertyFindRegex = new RegExp(`([^${separatorPattern}]+)` + `(${separatorPattern}?)`, 'g');
    let searchResult = propertyFindRegex.exec(propertyChainString);
    let result = propertiesScope[searchResult[1]];
    while(searchResult=propertyFindRegex.exec(propertyChainString))
    {
        result=result[searchResult[1]];
    }
    return result;
}
Renderer.prototype.getForCycleParams=function(stringWithForCycleParams,propertiesScope)
{
    let iterableObject;
    let matchResultForCycleParams = stringWithForCycleParams.match(this._forCycleParamsRegExp);
    let result = null;
    if(matchResultForCycleParams)
    {

        iterableObject = this.getPropertyChainValue(matchResultForCycleParams[2], propertiesScope, this._propertySeparatorPattern);
        result = {
            variableName: matchResultForCycleParams[1],
            iterableObject: iterableObject
        }
    }
    return result;
}
Renderer.prototype.stringReplace=function(string,startPos,length,stringForReplace)
{
    return string.substr(0, startPos) + stringForReplace + string.substr(startPos + length + 1);
}
//#endregion
//#region test
// let renderer=new Renderer();

// let propertiesScope={
//     lel:{
//         lil:[1,2,3]
//     }
// }
// console.log(renderer.getForCycleParams('i in lel.lil',propertiesScope));
// let propertiesScope={
//     1:[34]
// };
// let string='{{{1.0}}}{{{10}}}';
// console.log(renderer.parsePropertyChain(propertiesScope,string,/\{\{\{([a-zA-z0-9.]+?)\}\}\}/g,'\.'));

// var htmlparse=new HTMLParser();
// let pattern='renderFor([^)]{5,})';
// let text=
// `<div class="calendar">
//     <div class="calendar__header">
//         <div class="calendar__previous-button"></div>
//         <div class="calendar__title"></div>
//         <div class="calendar__next-button"></div>
//     </div>
//     <div class="calendar__body">
//         <div class="calendar__days-of-week-names-container">
//             <div class="calendar__day-of-week-name" renderFor(i in daysOfWeekNames)>
//                 {{{daysOfWeekNames.[[i]]}}}
//             </div>
//         </div>
//         <div class="calendar__days-of-week-container" renderFor(i in weeks)>
//             <div class="calendar__day" renderFor(j in weeks.[[i]])> {{{weeks.[[i]].[[j]]}}} </div>
//         </div>
//     </div>
// </div>`;
// let tagInfo=htmlparse.selectTagFromString(text,pattern,0);
// console.log(renderer.parseFromString(text,calendarInfo));
//#endregion
