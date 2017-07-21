'use strict';
import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import fullCalendar from 'fullcalendar';
import vex from 'vex-js';
import vex_dialog from 'vex-dialog';
import ReactSpinner from 'react-spinjs';
import ReactDOM from 'react-dom';
import {
  DropdownButton,
  MenuItem,
  ButtonToolbar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Drop from '../Drop';

// CSS Files for Calendar
import './calendarStyles/jquery-ui.css'
import './calendarStyles/calendar.css';
import './calendarStyles/fullcalendar.min.css';
import './calendarStyles/vex.css';
import './calendarStyles/vex-theme-os.css';

// Vex Plugin
vex.registerPlugin(vex_dialog);

// Initialize Submit Variable

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
                        $('.vex-theme-os').attr('id','result-window');
                        
                        // Post Call to Send Event Data to Server
                        $('#submit-btn').click('.vex-dialog-message', function(){

                            // Initial Error Handling of Form Field to Have All Fields Populated
                               if($('#calendar-title').val() === "" || $('#calendar-startDate').val() === "" || $('#calendar-endDate').val() === "" || $('#calendar-dropdown option:selected').text() === ""){
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
                                    vex.dialog.open({
                                        message: 'Your event was successfully inserted',
                                        buttons:[
                                            $.extend({},vex.dialog.buttons.NO,{text: 'Close Window'})
                                        ]
                                    });
                                    $('.vex-theme-os').attr('id','result-window');
                                    }
                                    $('#result-window').on('click', function(){
                                        this.setState({didSubmit: true});
                                    }.bind(this));
                                }.bind(this));
                            }
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

        //DOM Edits
        $('.ui-icon-circle-triangle-w').attr('class','fc-icon fc-icon-left-single-arrow');
        $('.ui-icon-circle-triangle-e').attr('class','fc-icon fc-icon-right-single-arrow');
        $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display','inherit');
        $('.dropdown').css('margin-right','8%');
    }

    renderCalendar() {
        
        //GetRequest for Google Calendar Events
        $.get('/calendar/geteventsnapshot', function(response){
          
            
            var calendarEventResponse = JSON.parse(response.calendarEventObject);
      
            // Remove Existing Events for Rerender
            $('#calendar').fullCalendar('removeEvents');

            // Show Spinner
            $('.spinner').show();

            // Breakdown of each calendar
            $.each(calendarEventResponse.objectEvents, function(i,calendar){
                //For initial and rerendering. Add Each Evenrs Object and rerender Calendar
                $('#calendar').fullCalendar('addEventSource', calendar);
                
                if (i === calendarEventResponse.objectEvents.length - 1){
                    //Hide Spinner
                    $('.spinner').hide();
                }
                
            }.bind(this));

        }.bind(this)).done(function(response){
            var calendarListResponse = JSON.parse(response.calendarListObject);
            //Add Calendar Names to Add Event Dropdown
             $('.fc-AddEvent-button').click(function(){
                $('#calendar-dropdown').html('');
                $.each(calendarListResponse.objectCalendars, function(i,val){
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
                <Drop />
                <ReactSpinner className='spinner'/>
                <div id="calendar"></div>
            </div>
        );
    }
}

export default Calendar;
