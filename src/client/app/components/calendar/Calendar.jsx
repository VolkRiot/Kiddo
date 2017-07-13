'use strict';
import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import fullCalendar from 'fullcalendar';
import vex from 'vex-js';
import vex_dialog from 'vex-dialog';



// CSS Files for Calendar

import './calendarStyles/fullcalendar.min.css';
import './calendarStyles/vex.css';
import './calendarStyles/vex-theme-os.css';

// Vex Plugin
vex.registerPlugin(vex_dialog);



class Calendar extends React.Component{
    getInitialState() {
        return {didSubmit: false}
    }

    renderCalendar() {
        // Array for Calendar Titles
        var allCalendars = [];
        var calendarTitleArray = [];
        // Define Random Color for Each Calendar
        var colorArray = ['red','blue','orange','green','purple'];
        $.get('/calendar/getevents', function(response){    
            
            // Push Calendar Titles to Its Own Array
            $.each(response.calendarList.items, function(i,val){
                calendarTitleArray.push(val.summary);
            });

            // Remove Existing Events for Rerender
            $('#calendar').fullCalendar('removeEvents');

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
                    return eventArray
                });
                var eventsObject = {
                    events: eventArray,
                    color: colorArray[i]
                }
                console.log("eventObject", i);
                
                //For rerendering. Add Each Source again and rerender Calendar
                
                $('#calendar').fullCalendar('addEventSource', eventsObject);
                $('#calendar').fullCalendar( 'rerenderEvents');
                
                allCalendars.push(eventsObject);
            }.bind(this));


        }.bind(this)).done(function(){
            //Initialize and Create Calendar
            $('#calendar').fullCalendar({
                aspectRatio: 2.25,
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
                                
                                $.post('/calendar/addevent', eventInfo).done(function(response){
                                    this.setState({didSubmit: true});
                                    console.log(response);
                                }.bind(this));
                            }.bind(this));
                        }.bind(this)
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
            
        }.bind(this));
    }

    render() {
        this.renderCalendar();
        return <div id="calendar"></div>;
    }
}

export default Calendar;

