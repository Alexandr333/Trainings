//-----------------------------------------------------------------------//
function CalendarControl()
{
    let currentYear=new Date().getFullYear();
    let currentMonth=new Date().getMonth();
    let calendarView;
    function VisualizeCalendar()
    {
        let calendarInfo=CalendarInfo.Create(DaysOfWeekStyle.Europe,currentYear,currentMonth);
        let calendarRenderer=new CalendarRenderer();
        document.querySelectorAll('.calendar-container')[0].appendChild(calendarRenderer.renderNewCalendarLayout(calendarInfo));

        if(currentYear===new Date().getFullYear() && currentMonth===new Date().getMonth())
        {
            let dayOfWeek=CalendarInfo.getDayOfWeek(new Date(),DaysOfWeekStyle.Europe);
            calendarRenderer.daysElements[(dayOfWeek-1)+(new Date(Date.now()).getDate())].className+=' calendar__day_today';
        }
        return calendarRenderer;
    }
    function CalendarCreateButtonsEventHandlers()
    {
        calendarView.nextButton.onclick=function()
        {
            let newDate = new Date(currentYear,(currentMonth+1));
            currentYear=newDate.getFullYear();
            currentMonth=newDate.getMonth();
            document.querySelectorAll('.calendar-container')[0].removeChild(calendarView.calendarElement);

            calendarView=VisualizeCalendar();
            CalendarCreateButtonsEventHandlers();
        }
        calendarView.previousButton.onclick=function()
        {
            let newDate = new Date(currentYear,(currentMonth-1));
            currentYear=newDate.getFullYear();
            currentMonth=newDate.getMonth();
            document.querySelectorAll('.calendar-container')[0].removeChild(calendarView.calendarElement);

            calendarView=VisualizeCalendar();
            CalendarCreateButtonsEventHandlers();
        }
    }
    
    calendarView = VisualizeCalendar();
    CalendarCreateButtonsEventHandlers();
    
}
CalendarControl();
//---//
