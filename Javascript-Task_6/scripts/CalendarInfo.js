function CalendarInfo()
{
    this.year=null;
    this.month=null;
    this.daysOfWeekNames=[];
    this.days=[];
    this.currentDate=null;
}
CalendarInfo.Create=function(daysOfWeekStyle,year,month)
{
    let calendarInfo = new CalendarInfo();
    let calendarDate = (arguments.length>2) ? new Date(year, month): new Date();
    let firstDayOfWeekOfMonth = CalendarInfo.getDayOfWeek(calendarDate,daysOfWeekStyle);

    calendarInfo.year = calendarDate.toLocaleString("en-US", { year: 'numeric' });
    calendarInfo.month = calendarDate.toLocaleString("en-US", { month: 'long' });
    calendarInfo.days = CalendarInfo.getMonthDays(calendarDate.getFullYear(),calendarDate.getMonth(),firstDayOfWeekOfMonth);
    calendarInfo.daysOfWeekNames=CalendarInfo.getDaysOfWeekNames(daysOfWeekStyle);

    return calendarInfo;
}
CalendarInfo.getMonthDays=function(year,month,firstDayOfWeekOfMonth)
{
    let daysInMonth=new Date(year,month+1,0).getDate();
    let days=[];
    CalendarInfo.fillStartOfDaysArray(days,firstDayOfWeekOfMonth);
    for(let i=1;i<=daysInMonth;i++)
    {
        days.push(new Date(year,month,i));
    }
    CalendarInfo.fillEndOfDaysArray(days,days.length);
    return days;
}
CalendarInfo.fillStartOfDaysArray=function(days,firstDayOfWeekOfMonth)
{
    for(let i=1;i<firstDayOfWeekOfMonth;i++)
    {
        days.push(null);
    }
}
CalendarInfo.fillEndOfDaysArray=function(days,daysNumber)
{
    if(daysNumber%7!==0)
    {
        for(let i=1;i<=7-daysNumber%7;i++)
        {
            days.push(null);
        }
    }
}
CalendarInfo.getDayOfWeek=function(date,daysOfWeekStyle)
{
    let dayOfWeek=date.getDay();
    
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
CalendarInfo.getDaysOfWeekNames=function(daysOfWeekStyle)
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
var DaysOfWeekStyle={
    American:0,
    Europe:1
}
Object.freeze(DaysOfWeekStyle);