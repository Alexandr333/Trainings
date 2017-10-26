//#region class HTMLStrinsParser
function HTMLStringsParser()
{
    this._startPattern = '<[^>]* ';
    this._endPattern = ' [^>]*>';
}
/**
 * @param {string} pattern - pattern for select necessary tag attributes
 */
HTMLStringsParser.prototype.selectTagFromString=function(text,pattern,startPosition)
{
    let startIndexTagContent,closingTagMatch,tagContentLength,tagContent;
    let openingTagMatch=this.selectOpeningTag(text,pattern,startPosition);
    let result=null;
    if(openingTagMatch)
    {
        startIndexTagContent = openingTagMatch.index + openingTagMatch[0].length;
        
        closingTagMatch = this.selectClosingTag(text,startIndexTagContent);
        if(closingTagMatch)
        {
            tagContentLength=closingTagMatch.index;
            tagContent=text.substr(startIndexTagContent,tagContentLength);
            result=new SelectedTagInfo(openingTagMatch,tagContent,closingTagMatch);
        }
    }
    return result;
}
HTMLStringsParser.prototype.selectClosingTag=function(text,startIndexTagContent)
{
        text=text.substr(startIndexTagContent);

        let isClosingTagSearched=false;
        let isNoValidResult=true;
        
        let openingTagRegex=new RegExp('<[^/>]*>','g');
        let closingTagRegex=new RegExp('<\/[^>]*>','g');
    
        let openingTag;
        let closingTag;
        while(!isClosingTagSearched || !isNoValidResult)
        {
            openingTag=openingTagRegex.exec(text);
            closingTag=closingTagRegex.exec(text);
            isClosingTagSearched=(openingTag!==null && closingTag!==null && openingTag.index>closingTag.index)||(openingTag===null && closingTag!==null);
            noValidResults = (closingTag===null);
        }
        return closingTag;

}
HTMLStringsParser.prototype.selectOpeningTag=function(text,patternBody,startPosition)
{
    let pattern;
    let searchRegExp;
    let result;
    if(patternBody!==null && patternBody!==undefined)
    {
        pattern=this._startPattern+patternBody+this._endPattern;
    }
    searchRegExp=new RegExp(pattern,'g');
    searchRegExp.lastIndex=startPosition;
    result=searchRegExp.exec(text);
    return result;
}
//#endregion
//#region class SelectedtagInfo

function SelectedTagInfo(openingTagMatch,tagContent,closingTagMatch)
{
    this.openingTag=null;
    this.tagContent=null;
    this.closingTag=null;
    this.startIndex=null;
    this.length=null;
    //
    this.openingTag = openingTagMatch[0];
    this.tagContent=tagContent;
    this.closingTag=closingTagMatch[0];
    this.startIndex=openingTagMatch.index;
    this.length=(closingTagMatch.index+closingTagMatch[0].length);
    //
}
SelectedTagInfo.prototype.getFullTag=function()
{
   return this.openingTag+this.tagContent+this.closingTag;
}
//#endregion
//#region tests
// var htmlparse=new HTMLStringsParser();
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
//#endregion