//-----------------------------------------------------------------------//
var CalendarButtonType={
    previousButton:0,
    nextButton:1
}
Object.freeze(CalendarButtonType);

function CalendarRenderer()
{
    this.calendarElement=null;
    //
    this.header=null;
        //
        this.title=null;
        this.nextButton=null;
        this.previousButton=null;
        //
    //
    this.body=null;
        //
        this.daysOfWeekNamesContainer=null;
        this.daysOfWeekContainers=[];
        this.firstDaysOfWeekContainer=null;
        this.lastDaysOfWeekContainer=null;

        this.daysOfWeekNamesElements=[];
        this.daysElements=[];
        //
    //
    //-------------------------------------------------//
    this.calendarInfo=null
    //
    this.renderNewCalendarLayout=function(calendarInfo)
    {
        this.title = CalendarRenderer.renderTitle(calendarInfo);
        this.nextButton = CalendarRenderer.renderButton(CalendarButtonType.nextButton);
        this.previousButton = CalendarRenderer.renderButton(CalendarButtonType.previousButton);
        this.header = CalendarRenderer.renderHeader(this.title, this.nextButton, this.previousButton);
        //
        this.daysElements = CalendarRenderer.renderDaysElements(calendarInfo);
        this.daysOfWeekNamesElements = CalendarRenderer.renderDaysOfWeekNamesElements(calendarInfo);
        //
        let weeksDaysContainers = CalendarRenderer.renderWeeksDaysContainers(this.daysOfWeekNamesElements, this.daysElements);
        this.daysOfWeekNamesContainer = weeksDaysContainers.daysOfWeekNames;
        this.daysOfWeekContainers = weeksDaysContainers.daysOfWeekContainers;
        this.firstDaysOfWeekContainer = weeksDaysContainers.firstDaysOfWeek;
        this.lastDaysOfWeekContainer = weeksDaysContainers.lastDaysOfWeek;
        
        this.body = CalendarRenderer.renderBody(this.daysOfWeekNamesContainer,this.daysOfWeekContainers);;
        //
        this.calendarElement = CalendarRenderer.createDivContainer('calendar',[this.header,this.body]);
        return this.calendarElement;
    }
}
//
CalendarRenderer.renderHeader=function(title,nextButton,previousButton)
{   
    let elements=[previousButton,title,nextButton];
    return CalendarRenderer.createDivContainer('calendar__header',elements);
}
    //
    CalendarRenderer.renderButton=function(calendarButtonType)
    {
        if(calendarButtonType===CalendarButtonType.previousButton)
        {
            return CalendarRenderer.createDivElementWithInnerHtml('calendar__previous-button','&#171;');
        }
        else
        {
            return CalendarRenderer.createDivElementWithInnerHtml('calendar__next-button','&#187;');
        }
    }
    CalendarRenderer.renderTitle=function(calendarInfo)
    {
        let text=calendarInfo.month+' '+calendarInfo.year;
        return CalendarRenderer.createSimpleDivElement('calendar__title',text);
    }
    //
//
CalendarRenderer.renderBody=function(daysOfWeekNamesContainer,daysOfWeekContainers)
{
    let elements=daysOfWeekContainers;
    elements.unshift(daysOfWeekNamesContainer);
    return CalendarRenderer.createDivContainer('calendar__body',elements);
}
    //
    CalendarRenderer.renderDaysOfWeekNamesElements=function(calendarInfo)
    {
        let daysOfWeekNamesElements = [];
        for(let day of calendarInfo.daysOfWeekNames)
        {
            let dayOfWeekElement = CalendarRenderer.createSimpleDivElement('calendar__day-of-week-name',day);
            daysOfWeekNamesElements.push(dayOfWeekElement);
        }
        return daysOfWeekNamesElements;
    }
    CalendarRenderer.renderDaysElements=function(calendarInfo)
    {
        let daysElements = [];
        for(let day of calendarInfo.days)
        {
            let dayElement;
            if(day!==null)
            {
                dayElement=CalendarRenderer.createSimpleDivElement('calendar__day',day.getDate());
            }
            else
            {
                dayElement=CalendarRenderer.createSimpleDivElement('calendar__day','');
            }
            daysElements.push(dayElement)
        }
        return daysElements;
    }
    CalendarRenderer.renderWeeksDaysContainers=function(daysOfWeekNames,days)
    {
        let daysOfWeekNamesContainer = CalendarRenderer.createDivContainer('calendar__days-of-week-names-container',daysOfWeekNames);
        let daysOfWeekContainers=[];
        let firstDaysOfWeekContainer;
        let lastDaysOfWeekContainer;

        let index=0;
        while(index<days.length)
        {
            let daysOfWeek=days.slice(index,index+7);
            if((index+7)>=days.length)
            {
                lastDaysOfWeekContainer=daysOfWeek;
            }
            else if(index===0)
            {
                firstDaysOfWeekContainer=daysOfWeek;
            }
            index+=7;
            daysOfWeekContainers.push(CalendarRenderer.createDivContainer('calendar__days-of-week-container',daysOfWeek));
        }
        let result ={
            daysOfWeekNames:daysOfWeekNamesContainer,
            daysOfWeekContainers:daysOfWeekContainers,
            firstDaysOfWeek:firstDaysOfWeekContainer,
            lastDaysOfWeek:lastDaysOfWeekContainer
        }
        return result;
    }
    //
//
CalendarRenderer.createSimpleDivElement=function(clasesNamesString,textContent)
{
    var div = document.createElement("div");
    //
    div.setAttribute('class',clasesNamesString);
    div.textContent=textContent;
    //
    return div;
}
CalendarRenderer.createDivElementWithInnerHtml=function(clasesNamesString,textContent)
{
    var div = document.createElement("div");
    //
    div.setAttribute('class',clasesNamesString);
    div.innerHTML=textContent;
    //
    return div;
}
CalendarRenderer.createDivContainer=function(clasesNamesString,htmlElementsArray)
{
    var div = document.createElement("div");
    //
    if(arguments.length>1)
    {
        div.setAttribute('class',clasesNamesString);
        for(let element of htmlElementsArray)
        {
            div.appendChild(element);
        }
    }
    //
    return div;
}
