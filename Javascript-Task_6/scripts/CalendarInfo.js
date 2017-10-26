//#region class CalendarInfo
function CalendarInfo(daysOfWeekStyle,date)
{
    this.year=null;
    this.month=null;
    this.daysOfWeekNames=[];
    this.days=[];
    this.weeks=[];
    this.yearAndMonth=null;
    this.daysOfWeekStyle=null;
    //
    this.update(date,daysOfWeekStyle);
}
CalendarInfo.prototype._tryGetDate=function(date)
{
    if(date instanceof Date)
    {
        return date.getDate();
    }
    else
    {
        return date.toString();
    }
}
CalendarInfo.prototype.getMonthDays=function(year,month,firstDayOfWeekOfMonth)
{
    let daysInMonth=new Date(year,month+1,0).getDate();
    let days=[];
    for(let i=1;i<=daysInMonth;i++)
    {
        days.push(new Date(year,month,i));
    }
    return days;
}
CalendarInfo.prototype.separateDaysOnWeeks=function(days,firstDayOfWeekOfMonth)
{
    days=this.fillStartOfDaysArray(days, firstDayOfWeekOfMonth);
    days=this.fillEndOfDaysArray(days, days.length);
    let weeks = [];
    let index = 0;
    while(index<days.length)
    {
        weeks.push(days.splice(index, 7).map(this._tryGetDate));
    }
    return weeks;
}
CalendarInfo.prototype.fillStartOfDaysArray=function(days,firstDayOfWeekOfMonth)
{
    for(let i=1;i<firstDayOfWeekOfMonth;i++)
    {
        days.unshift('');
    }
    return days;
}
CalendarInfo.prototype.fillEndOfDaysArray=function(days,daysNumber)
{
    if(daysNumber%7!==0)
    {
        for(let i=1;i<=7-daysNumber%7;i++)
        {
            days.push('');
        }
    }
    return days;
}
CalendarInfo.prototype.getDayOfWeek=function(date,daysOfWeekStyle)
{
    let dayOfWeek=date.getDay();
    if(daysOfWeekStyle===undefined)
    {
        daysOfWeekStyle=this.daysOfWeekStyle;
    }
    if(daysOfWeekStyle===DaysOfWeekStyle.Europe)
    {
        dayOfWeek=(dayOfWeek===0)?7:dayOfWeek;
        return dayOfWeek;
    }
    else if(daysOfWeekStyle===DaysOfWeekStyle.American)
    {
        return dayOfWeek+1;
    }
}
CalendarInfo.prototype.getDaysOfWeekNames=function(daysOfWeekStyle)
{
    let daysOfWeekNames=["Mo","Tu","We","Th","Fr","Sa","Su"];

    if(daysOfWeekStyle===DaysOfWeekStyle.Europe)
    {
        return daysOfWeekNames;
    }
    else if(daysOfWeekStyle===DaysOfWeekStyle.American)
    {
        let temp=daysOfWeekNames.pop();
        daysOfWeekNames.unshift(temp);
        return daysOfWeekNames;
    }
}
CalendarInfo.prototype.NextMonth=function()
{
    let newDate=new Date(this.year, this.month+1);
    this.update(newDate);
    return this;
}
CalendarInfo.prototype.PreviousMonth=function()
{
    let newDate=new Date(this.year, this.month-1);
    this.update(newDate);
    return this;
}
CalendarInfo.prototype.update=function(date,daysOfWeekStyle)
{
    let newDate = arguments.length < 1 ? new Date() : date;
    if(arguments.length>1)
    {
        this.daysOfWeekStyle=daysOfWeekStyle;
    }
    let firstDayOfWeekOfMonth = this.getDayOfWeek(newDate,this.daysOfWeekStyle);
    this.yearAndMonth = newDate.toLocaleString("en-GB", { year: 'numeric', month: 'long' });
    this.year = newDate.getFullYear();
    this.month = newDate.getMonth();
    this.days = this.getMonthDays(this.year, this.month, firstDayOfWeekOfMonth);
    this.weeks = this.separateDaysOnWeeks(this.days.slice(), firstDayOfWeekOfMonth);
    this.daysOfWeekNames = this.getDaysOfWeekNames(this.daysOfWeekStyle);
}
CalendarInfo.prototype.getFullDate=function(day)
{
    return new Date(this.year,this.month,day);
}
CalendarInfo.prototype.getTodaysIndex=function()
{
    let date=new Date();
    if(this.year===date.getFullYear() && this.month===date.getMonth())
    {
        return date.getDate()+this.getDayOfWeek(date);
    }
    return null;
}
var DaysOfWeekStyle={
    American:0,
    Europe:1
}
Object.freeze(DaysOfWeekStyle);
//#endregion
//#region tests
let calendarInfo=new CalendarInfo(DaysOfWeekStyle.Europe,new Date());
console.log(calendarInfo.getTodaysIndex())
console.log(calendarInfo.getFullDate(23));
//#endregion
