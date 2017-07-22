'use strict';
import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import fullCalendar from 'fullcalendar';
import vex from 'vex-js';
import vex_dialog from 'vex-dialog';
import ReactSpinner from 'react-spinjs';

// CSS Files for Calendar
import './calendarStyles/jquery-ui.css';
import './calendarStyles/fullcalendar.min.css';
import './calendarStyles/vex.css';
import './calendarStyles/vex-theme-os.css';

// Vex Plugin
vex.registerPlugin(vex_dialog);

// Define Color Array
const colorArray = ['#f7786b','#c178ba','#ffdd32','#56d8b1', '#FF68DD','#ffaa28', '#44B4D5', '#01F33E', '#E37795', '#FFF06A'];

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { didSubmit: false };
    }

    componentDidMount() {
        // Initialize fullCalendar
        $('#calendar').fullCalendar({
            theme: true,
            aspectRatio: 2.5,
            // Add Event Button
            customButtons: {
                CalendarLegend: {
                    text: 'calendar legend'
                },
                NewKiddo: {
                    text: 'new kiddo'
                },
                Map: {
                    text: 'map'
                },
                Dashboard: {
                    text: 'dashboard'
                },
                AddEvent: {
                    text: 'add event',
                    click: function() {
                        // Modal for Add Event
                        vex.defaultOptions.className = 'vex-theme-os';
                        vex.dialog.open({
                            buttons:[
                                $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                            ]
                        });
                        
                        // JQuery DOM Edit to Allow Creation of Form
                        // eslint-disable-next-line quotes
                        
                        $('.vex-dialog-message').html("<form><div class='form-group'><label for='calendar-title'>Event Tite</label><input type='text' class='form-control' id='calendar-title'></div><div class='form-group'><label for='calendar-startDate'>Start Date</label><input type='datetime-local' class='form-control' id='calendar-startDate'></div><div class='form-group'><label for='calendar-endDate'>End Date</label><input type='datetime-local' class='form-control' id='calendar-endDate'></div><div class='form-group'><label for='calendar-dropdown'>Calendar Name</label><select class='form-control' id='calendar-dropdown'></select></div><button type='submit' id='submit-btn' class='btn btn-primary'>Submit Event</button></form>");
                        $('.vex-theme-os').attr('id','result-window');
                        
                        // Post Call to Send Event Data to Server
                        $('#submit-btn').click('.vex-dialog-message', function(){

                            // Initial Error Handling of Form Field to Have All Fields Populated
                               if ($('#calendar-title').val() === '' || $('#calendar-startDate').val() === '' || $('#calendar-endDate').val() === '' || $('#calendar-dropdown option:selected').text() === ''){
                                  vex.dialog.open({
                                        message: 'Please Enter All Fields and Try Again',
                                        buttons:[
                                            $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                                        ]
                                    });
                                } else {
                                    var eventInfo = {
                                        title: $('#calendar-title').val().trim(),
                                        startDate: $('#calendar-startDate').val().trim(),
                                        endDate: $('#calendar-endDate').val().trim(),
                                        calendar: $('#calendar-dropdown option:selected').text().trim()
                                    };
                               
                                $.post('/calendar/addevent', eventInfo).done(function(response){
                                    // API Error Handling
                                    if (response === 'error'){
                                        vex.dialog.open({
                                            message: 'There was an error inserting your event. Please try again',
                                            buttons:[
                                                $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                                            ]
                                        });
                                        $('.vex-theme-os').attr('id','result-window');
                                    } else {
                                        this.setState({didSubmit: true});
                                    vex.dialog.open({
                                        message: 'Your event was successfully inserted',
                                        buttons:[
                                            $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                                        ]
                                    });
                                    $('.vex-theme-os').attr('id','result-window');
                                    }
                                }.bind(this));
                            }
                        }.bind(this));
                    }.bind(this)
                }
            },
            header: {
				left: 'prev,next today month,basicWeek,basicDay list',
                center: 'title',
                right: 'AddEvent NewKiddo Map Dashboard'
            }
        });

        //DOM Edits
        $('.ui-icon-circle-triangle-w').attr('class','fc-icon fc-icon-left-single-arrow');
        $('.ui-icon-circle-triangle-e').attr('class','fc-icon fc-icon-right-single-arrow');
        $('.fc-NewKiddo-button').html("<a href='#/dashboard/addkiddo' role='menuitem'>new kiddo</a>");
        $('.fc-Map-button').html("<a href='#/dashboard/map' role='menuitem'>map</a>");
        $('.fc-Dashboard-button').html("<a href='#/dashboard' role='menuitem'>dashboard</a>");
        $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display','inherit');
        
    }

    renderCalendar() {
        
        // Show Spinner
        
        $('.spinner').show();
        
        //GetRequest for Google Calendar Events
        $.get('/calendar/getevents', function(response){
          
            
            var calendarEventResponse = response.objectEvents;
      
            // Remove Existing Events for Rerender
            $('#calendar').fullCalendar('removeEvents');

            
            // Breakdown of each calendar
            $.each(calendarEventResponse, function(i,calendar){
                console.log(calendarEventResponse);
                //For initial and rerendering. Add Each Evenrs Object and rerender Calendar
                $('#calendar').fullCalendar('addEventSource', calendar);

                if (i === calendarEventResponse.length - 1){
                    //Hide Spinner
                    $('.spinner').hide();
                }
                
            }.bind(this));

        }.bind(this)).done(function(response){
            var calendarListResponse = response.objectCalendars;
            //Add Calendar Names to Add Event Dropdown
             $('.fc-AddEvent-button').click(function(){
                $('#calendar-dropdown').html('');
                $.each(calendarListResponse, function(i,val){
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
        return (
            <div>
                <ReactSpinner className='spinner'/>
                <div id="calendar"></div>
            </div>
        );
    }
}

export default Calendar;
