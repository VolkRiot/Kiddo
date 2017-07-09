'use strict';
import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import fullCalendar from 'fullcalendar';
import vex from 'vex-js';
import vex_dialog from 'vex-dialog';


// CSS Files for Calendar
import '../helpers/calendarStyles/fullcalendar.min.css';
import '../helpers/calendarStyles/fullcalendar.print.min.css';
import '../helpers/calendarStyles/vex.css';
import '../helpers/calendarStyles/vex-theme-os.css';

class Calendar extends React.Component{
    componentDidMount() {
        var allCalendars = [];
        // Array for Calendar Titles
        var calendarTitleArray = [];
        // Define Random Color for Each Calendar
        var colorArray = ['red','blue','orange','green','purple']
        $.get('/calendar/getevents', function(response){
            
            // Push Calendar Titles to Its Own Array
            $.each(response.calendarList.items, function(i,val){
                calendarTitleArray.push(val.summary);
            });
            
            // Breakdown of each calendar
            $.each(response.eventsForCalendars, function(i,calendar){
                var eventArray = [];
                // Breakdown each event
                $.each(calendar.items, function(i,event){
                    // All Day Events vs Specific DateTime events filtering
                    var startDate;
                    var endDate;
                    if(event.start.date == null || event.end.date == null){
                        startDate = event.start.dateTime;
                        endDate = event.end.dateTime;
                    } else{
                        startDate = event.start.date
                        endDate = event.end.date
                    }
                    var eventObject = {
                        title: event.summary,
                        start: startDate,
                        end: endDate
                    }
                    eventArray.push(eventObject);
                });
                var eventsObject = {
                    events: eventArray,
                    color: colorArray[i]
                }
                allCalendars.push(eventsObject);
            });
        }).done(function(){
        
            //Initialize and Create Calendar
            vex.registerPlugin(vex_dialog);
            $('#calendar').fullCalendar({
                // Add Event Button
                customButtons: {
                    AddEvent: {
                        text: 'add event',
                        click: function() {
                            // Modal for Add Event
                            vex.defaultOptions.className = 'vex-theme-os';
                            vex.dialog.open({
                                message: "Comments",
                                buttons:[
                                    $.extend({},vex.dialog.buttons.NO,{text: "Close Window"})
                                ]
                            });

                            // JQuery DOM Edit to Allow Creation of Form
                            $('.vex-dialog-message').html("<form><div class='form-group'><label for='calendar-title'>Event Tite</label><input type='text' class='form-control' id='calendar-title'></div><div class='form-group'><label for='calendar-startDate'>Start Date</label><input type='datetime-local' class='form-control' id='calendar-startDate'></div><div class='form-group'><label for='calendar-endDate'>End Date</label><input type='datetime-local' class='form-control' id='calendar-endDate'></div><div class='form-group'><label for='calendar-dropdown'>Calendar Name</label><select class='form-control' id='calendar-dropdown'></select></div><button type='submit' id='submit-btn' class='btn btn-primary'>Submit Event</button></form>");
                        
                            // Dropdown Menu Creation
                            $.each(calendarTitleArray, function(i,val){
                                var newOption = $('<option>');
                                newOption.html(val);
                                newOption.attr('value',val);
                                $('#calendar-dropdown').append(newOption);
                            });

                            // Post Call to Send Event Data to Server
                            $('#submit-btn').click('.vex-dialog-message', function(event){
                                var eventInfo = {
                                    title: $("#calendar-title").val().trim(),
                                    startDate: $("#calendar-startDate").val().trim(),
                                    endDate: $("#calendar-endDate").val().trim(),
                                    calendar: $('#calendar-dropdown option:selected').text().trim()
                                }
                                $.post('/calendar/addevent', eventInfo);
                            });
                        }
                    }
                },
                header: {
				    left: 'prev,next today AddEvent',
				    center: 'title',
				    right: 'month,basicWeek,basicDay list'
			    },
                eventSources: allCalendars
            });

            // Allow Buttons to Show
            $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display','inherit');
        });
    }

    render() {
        return <div id="calendar"></div>;
    }
}

export default Calendar;

