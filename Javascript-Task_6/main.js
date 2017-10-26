let calendarContainer=document.querySelectorAll('div.calendar-container')[0];
let calendar=new Calendar(calendarContainer,DaysOfWeekStyle.Europe,new Date());
calendar.visualize();