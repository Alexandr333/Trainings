//#region class Calendar
function Calendar(htmlElementContainer,DaysOfWeekStyle,date)
{
    this._calendarInfo=new CalendarInfo(DaysOfWeekStyle,date);
    this._Renderer=new Renderer();
    this._containerElement=htmlElementContainer;
    this.__CALENDAR_TEMPLATE=`<div class="calendar">
        <div class="calendar__header">
            <div class="calendar__previous-button">&#171;</div>
            <div class="calendar__title">{{{yearAndMonth}}}</div>
            <div class="calendar__next-button">&#187;</div>
        </div>
        <div class="calendar__body">
            <div class="calendar__days-of-week-names-container">
                <div class="calendar__day-of-week-name" renderFor(i in daysOfWeekNames)>
                    {{{daysOfWeekNames.[[i]]}}}
                </div>
            </div>
            <div class="calendar__days-of-week-container" renderFor(i in weeks)>
                <div class="calendar__month-day" renderFor(j in weeks.[[i]])> {{{weeks.[[i]].[[j]]}}} </div>
            </div>
        </div>
    </div>`;
    this._subscriptions=[];
}
Calendar.prototype.visualize=function()
{
    this.deleteSubscriptions();
    let htmlString=this._Renderer.parseFromString(this.__CALENDAR_TEMPLATE,this._calendarInfo);
    this._containerElement.innerHTML=htmlString;
    this.pickOutToday();
    this.createSubscriptions();
}
Calendar.prototype.createSubscriptions=function()
{
    let calendarBody = this._containerElement.querySelectorAll('.calendar__body')[0];
    let subscription;
    subscription = DOMSubscription.createSubscription(calendarBody,'click',this.dayClickHeandler());
    this._subscriptions.push(subscription);

    let calendarHeader = this._containerElement.querySelectorAll('.calendar__header')[0];
    subscription = DOMSubscription.createSubscription(calendarHeader,'click',this.buttonClickHeandler());
    this._subscriptions.push(subscription);
}
Calendar.prototype.deleteSubscriptions=function()
{
    while(this._subscriptions.length>0)
    {
        this._subscriptions.pop().unsubscribe();
    }
}
Calendar.prototype.pickOutToday=function()
{
    let index=this._calendarInfo.getTodaysIndex();
    if(index!==null)
    {
        this._containerElement.querySelectorAll('.calendar__month-day')[index].classList.add('calendar__day_today');
    }
}
Calendar.prototype.buttonClickHeandler=function()
{
    return (event)=>
    {
        let target = event.target;
        if(target.classList.value.indexOf('calendar__previous-button')>-1)
        {
            this._calendarInfo.PreviousMonth();
            this.visualize();
        }
        else if(target.classList.value.indexOf('calendar__next-button')>-1)
        {
            this._calendarInfo.NextMonth();
            this.visualize();
        }
    }
}
Calendar.prototype.dayClickHeandler=function()
{
    return (event)=>
    {
        let target = event.target;
        if(target.classList.value.indexOf('calendar__month-day')>-1 && target.textContent.trim()!='')
        {
            console.log('Clicked'+target.textContent);
        }
    }
}
//#endregion