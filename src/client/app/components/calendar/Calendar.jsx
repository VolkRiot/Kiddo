'use strict';
import React, { Component } from 'react';
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

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { didSubmit: false };
    }

    componentDidMount() {
        // Initialize fullCalendar
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
                            message: 'Comments',
                            buttons:[
                                $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                            ]
                        });

                        // JQuery DOM Edit to Allow Creation of Form
                        // eslint-disable-next-line quotes
                        $('.vex-dialog-message').html("<form><div class='form-group'><label for='calendar-title'>Event Tite</label><input type='text' class='form-control' id='calendar-title'></div><div class='form-group'><label for='calendar-startDate'>Start Date</label><input type='datetime-local' class='form-control' id='calendar-startDate'></div><div class='form-group'><label for='calendar-endDate'>End Date</label><input type='datetime-local' class='form-control' id='calendar-endDate'></div><div class='form-group'><label for='calendar-dropdown'>Calendar Name</label><select class='form-control' id='calendar-dropdown'></select></div><button type='submit' id='submit-btn' class='btn btn-primary'>Submit Event</button></form>");

                        // Post Call to Send Event Data to Server
                        $('#submit-btn').click('.vex-dialog-message', function(){
                            var eventInfo = {
                                title: $('#calendar-title').val().trim(),
                                startDate: $('#calendar-startDate').val().trim(),
                                endDate: $('#calendar-endDate').val().trim(),
                                calendar: $('#calendar-dropdown option:selected').text().trim()
                            };

                            $.post('/calendar/addevent', eventInfo).done(function(){
                                this.setState({didSubmit: true});
                            }.bind(this));
                        }.bind(this));
                    }.bind(this)
                }
            },
            header: {
				left: 'prev,next today AddEvent',
				center: 'title',
				right: 'month,basicWeek,basicDay list'
			}
        });

        //DOM Edit to Illustrate Calendar Buttons
        $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display','inherit');
    }

    renderCalendar() {

        // Array for Calendar Titles
        var calendarTitleArray = [];
        
        // Define Random Color for Each Calendar
        var colorArray = ['#ffaa28','#f7786b','#c178ba','#ffdd32','#56d8b1'];

        //GetRequest for Google Calendar Events
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
                    if (event.start.date == null || event.end.date == null){
                        startDate = event.start.dateTime;
                        endDate = event.end.dateTime;
                    } else {
                        startDate = event.start.date;
                        endDate = event.end.date;
                    }
                    var eventObject = {
                        title: event.summary,
                        start: startDate,
                        end: endDate
                    };
                    eventArray.push(eventObject);
                    return eventArray;
                });
                var eventsObject = {
                    events: eventArray,
                    color: colorArray[i]
                };

                //For initial and rerendering. Add Each Evenrs Object and rerender Calendar

                $('#calendar').fullCalendar('addEventSource', eventsObject);
                $('#calendar').fullCalendar('rerenderEvents');

            }.bind(this));

        }.bind(this)).done(function(){

            //Add Calendar Names to Add Event Dropdown
             $('.fc-AddEvent-button').click(function(){
                $('#calendar-dropdown').html('');
                $.each(calendarTitleArray, function(i,val){
                    var newOption = $('<option>');
                    newOption.html(val);
                    newOption.attr('value',val);
                    $('#calendar-dropdown').append(newOption);
                });
            });
        }.bind(this));
    }

    render() {
        this.renderCalendar();
        return <div id="calendar"></div>;
    }
}

export default Calendar;
